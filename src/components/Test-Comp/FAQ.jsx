
"use client";

import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";

export default function Faq({ data }) {
  if (!data || !data.title || !Array.isArray(data.items)) return null;

  const { title, intro, image } = data;

  const items = useMemo(
    () =>
      data.items
        .map((x, i) => ({ ...x, _id: x.id ?? String(i) }))
        .filter((x) => x.question && x.answer),
    [data.items]
  );

  if (!items.length) return null;

  const [openId, setOpenId] = useState(items[0]._id);

  return (
    <section className="relative w-full bg-[#ffff] px-6 md:px-14 py-20">
      {/* Tag */}
      <div className="absolute top-6 right-6 md:right-14">
        <span className="rounded-md bg-lime-200/70 px-3 py-1 text-sm font-medium">
          FAQs
        </span>
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-medium leading-tight tracking-tight">
            {title}
          </h2>
          {intro && (
            <p className="mt-6 max-w-3xl text-base md:text-lg text-black/65 leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FAQ list */}
          <div className="lg:col-span-7">
            <div className="space-y-10">
              {items.map((item) => {
                const isOpen = item._id === openId;

                return (
                  <div key={item._id}>
                    <button
                      onClick={() =>
                        setOpenId(isOpen ? null : item._id)
                      }
                      className="group w-full text-left flex items-start justify-between gap-6"
                    >
                      <h3
                        className={[
                          "text-xl md:text-2xl font-medium transition-colors",
                          isOpen
                            ? "text-black"
                            : "text-black/40 group-hover:text-black/60",
                        ].join(" ")}
                      >
                        {item.question}
                      </h3>

                      <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white">
                        {isOpen ? (
                          <X className="h-4 w-4 text-black/70" />
                        ) : (
                          <Plus className="h-4 w-4 text-black/50" />
                        )}
                      </span>
                    </button>

                    {/* Active indicator */}
                    <div
                      className={[
                        "mt-4 h-px w-full transition-colors",
                        isOpen ? "bg-black/20" : "bg-black/10",
                      ].join(" ")}
                    />

                    {/* Answer */}
                    {isOpen && (
                      <div className="mt-5 pr-10">
                        <p className="text-black/65 text-base md:text-lg leading-relaxed">
                          {item.answer}
                        </p>

                        {item.note && (
                          <p className="mt-4 text-sm text-black/55">
                            {item.note}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
                {image?.src ? (
                  <img
                    src={image.src}
                    alt={image.alt ?? "FAQ"}
                    className="h-[420px] w-full object-cover"
                  />
                ) : (
                  <div className="p-10 text-black/50">
                    Add an image for visual balance.
                  </div>
                )}
              </div>

              <p className="mt-6 text-sm text-black/55 leading-relaxed">
                Clear answers help you decide faster. If something still feels
                unclear, the right test choice usually depends on your target
                country and timeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
