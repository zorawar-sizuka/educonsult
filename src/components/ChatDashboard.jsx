"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ChatDashboard() {
  const [activeChat, setActiveChat] = useState(null); // phone number string
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isWindowClosed, setIsWindowClosed] = useState(false);
  const [chats, setChats] = useState([]); // list of phone numbers
  const [loadingChats, setLoadingChats] = useState(true);

  // --- 0) Load chat list (unique inbound senders) ---
  useEffect(() => {
    let cancelled = false;

    const loadChats = async () => {
      setLoadingChats(true);

      const { data, error } = await supabase
        .from("messages")
        .select("from_number, direction, timestamp")
        .eq("direction", "inbound")
        .order("timestamp", { ascending: false })
        .limit(200);

      if (!cancelled) {
        if (error) {
          console.error("Load chats error:", error);
          setChats([]);
        } else {
          const unique = [];
          const seen = new Set();
          for (const row of data || []) {
            const num = row?.from_number;
            if (num && !seen.has(num)) {
              seen.add(num);
              unique.push(num);
            }
          }
          setChats(unique);

          // Auto-select first chat if none selected
          if (!activeChat && unique.length > 0) setActiveChat(unique[0]);
        }
        setLoadingChats(false);
      }
    };

    loadChats();

    // Realtime: when a new inbound message arrives, update chat list
    const channel = supabase
      .channel("chat_list_updates")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const row = payload.new;
          if (row?.direction !== "inbound") return;
          const num = row?.from_number;
          if (!num) return;

          setChats((prev) => (prev.includes(num) ? prev : [num, ...prev]));
          // If no active chat, select it
          setActiveChat((cur) => cur || num);
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [activeChat]);

  // --- 1) Fetch messages + realtime for active chat ---
  useEffect(() => {
    if (!activeChat) return;

    let cancelled = false;

    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`from_number.eq.${activeChat},to_number.eq.${activeChat}`)
        .order("timestamp", { ascending: true });

      if (error) console.error("Fetch history error:", error);

      if (!cancelled) {
        const list = data || [];
        setMessages(list);

        // 24h rule check: last inbound from this user
        const lastInbound = [...list]
          .reverse()
          .find((m) => m.direction === "inbound" && m.from_number === activeChat);

        if (lastInbound?.timestamp) {
          const hoursDiff =
            (Date.now() - new Date(lastInbound.timestamp).getTime()) / 36e5;
          setIsWindowClosed(hoursDiff > 24);
        } else {
          setIsWindowClosed(false);
        }
      }
    };

    fetchHistory();

    const channel = supabase
      .channel(`chat_room_${activeChat}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const row = payload.new;

          // Only append messages belonging to this chat
          const belongs =
            row?.from_number === activeChat || row?.to_number === activeChat;

          if (!belongs) return;

          setMessages((prev) => [...prev, row]);

          // If inbound arrives, window is open again
          if (row?.direction === "inbound" && row?.from_number === activeChat) {
            setIsWindowClosed(false);
          }
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [activeChat]);

  // --- 2) Send message ---
  const handleSend = async () => {
    if (!activeChat) {
      alert("Select a chat first.");
      return;
    }
    if (!input.trim()) return;

    const text = input.trim();

    const res = await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: activeChat, message: text }),
    });

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      if (result?.error === "24_HOUR_WINDOW_CLOSED") {
        alert("Cannot reply: 24 Hour window has closed. Send a template.");
        setIsWindowClosed(true);
        return;
      }
      alert(result?.error || "Send failed");
      return;
    }

    // Optimistic UI (DB insert also happens server-side)
    setMessages((prev) => [
      ...prev,
      {
        direction: "outbound",
        body: text,
        timestamp: new Date().toISOString(),
        to_number: activeChat,
      },
    ]);

    setInput("");
  };

  return (
    <div className="flex h-[600px] bg-white border rounded-xl overflow-hidden">
      {/* Left: Chat list */}
      <div className="w-64 border-r bg-slate-50">
        <div className="p-3 border-b text-sm font-semibold">Chats</div>

        <div className="p-2 space-y-1 overflow-y-auto h-[calc(600px-48px)]">
          {loadingChats ? (
            <div className="text-xs text-slate-500 p-2">Loading chats…</div>
          ) : chats.length === 0 ? (
            <div className="text-xs text-slate-500 p-2">
              No inbound chats yet. Send a message to your WhatsApp business number first.
            </div>
          ) : (
            chats.map((num) => (
              <button
                key={num}
                onClick={() => setActiveChat(num)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm border ${
                  activeChat === num
                    ? "bg-white border-slate-300"
                    : "bg-transparent border-transparent hover:bg-white"
                }`}
              >
                {num}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right: Messages + input */}
      <div className="flex flex-col flex-1">
        <div className="p-3 border-b text-sm font-semibold">
          {activeChat ? `Chat: ${activeChat}` : "Select a chat"}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.direction === "outbound" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs text-sm ${
                  msg.direction === "outbound"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.body}
              </div>
            </div>
          ))}

          {isWindowClosed && (
            <div className="text-center text-xs text-red-500 bg-red-50 p-2 rounded">
              ⚠ 24-Hour Session Closed. You can only send Templates now.
            </div>
          )}
        </div>

        <div className="p-4 border-t flex gap-2">
          <input
            disabled={isWindowClosed || !activeChat}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              !activeChat
                ? "Select a chat"
                : isWindowClosed
                ? "Session expired"
                : "Type a message..."
            }
            className="flex-1 border rounded-lg px-4 py-2"
          />
          <button
            onClick={handleSend}
            disabled={isWindowClosed || !activeChat}
            className="bg-blue-600 text-white px-6 rounded-lg font-medium disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
