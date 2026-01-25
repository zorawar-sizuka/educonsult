// src/components/Test-Comp/TableSection.jsx
export default function TableSection({ data }) {
    if (!data || !data.title || !data.mode) return null;
  
    const { title, intro, mode } = data;
  
    return (
      <section className="w-full px-6 md:px-14 py-16 relative">
        {/* Tag — LEFT */}
        <div className="absolute top-0 left-6 md:left-14">
          <span className="inline-flex items-center rounded-md bg-lime-200/70 px-3 py-1 text-sm font-medium text-black">
            Table
          </span>
        </div>
  
        <div className="max-w-6xl mx-auto mt-10">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-black">
              {title}
            </h2>
            {intro ? (
              <p className="mt-4 text-black/70 text-base md:text-lg leading-relaxed">
                {intro}
              </p>
            ) : null}
          </div>
  
          <div className="mt-10">
            {mode === "ielts" ? (
              <IELTSTable table={data.table} />
            ) : mode === "pte" ? (
              <PTETables groups={data.groups} />
            ) : null}
          </div>
        </div>
      </section>
    );
  }
  
  /* ---------------- IELTS TABLE (single table) ---------------- */
  
  function IELTSTable({ table }) {
    if (
      !table ||
      !Array.isArray(table.columns) ||
      !Array.isArray(table.rows)
    )
      return null;
  
    // columns: [{ key, label, widthClass? }]
    // rows: [{ section, time, questions, itemTypes: string[] }]
  
    return (
      <div className="rounded-2xl border border-black/10 overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-black/[0.03]">
              <tr>
                {table.columns.map((c) => {
                  if (!c?.key || !c?.label) return null;
                  return (
                    <th
                      key={c.key}
                      className={`px-5 py-4 text-sm font-semibold text-black/80 border-b border-black/10 ${c.widthClass ?? ""}`}
                    >
                      {c.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
  
            <tbody>
              {table.rows.map((r, idx) => {
                if (!r?.section || !r?.time || !r?.questions || !Array.isArray(r?.itemTypes))
                  return null;
  
                return (
                  <tr
                    key={`${r.section}-${idx}`}
                    className="border-b border-black/10 last:border-b-0 hover:bg-black/[0.02]"
                  >
                    <td className="px-5 py-5 font-semibold text-black">
                      {r.section}
                    </td>
                    <td className="px-5 py-5 text-black/80">{r.time}</td>
                    <td className="px-5 py-5 text-black/80">{r.questions}</td>
                    <td className="px-5 py-5 text-black/80">
                      <div className="flex flex-wrap gap-2">
                        {r.itemTypes.map((t, i) => (
                          <span
                            key={`${t}-${i}`}
                            className="inline-flex rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  /* ---------------- PTE TABLES (grouped by Part) ---------------- */
  
  function PTETables({ groups }) {
    if (!Array.isArray(groups) || groups.length === 0) return null;
  
    return (
      <div className="space-y-8">
        {groups.map((g) => {
          if (!g?.title || !Array.isArray(g?.rows)) return null;
  
          return (
            <div key={g.title} className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm">
              {/* Group header */}
              <div className="px-5 py-4 bg-black/[0.03] border-b border-black/10">
                <p className="text-lg font-semibold text-black">{g.title}</p>
              </div>
  
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="px-5 py-4 text-sm font-semibold text-black/80">
                        Item Types
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold text-black/80 w-[220px]">
                        Total no. of Questions
                      </th>
                    </tr>
                  </thead>
  
                  <tbody>
                    {g.rows.map((r, idx) => {
                      if (!r?.itemType || !r?.questions) return null;
                      return (
                        <tr
                          key={`${g.title}-${idx}`}
                          className="border-b border-black/10 last:border-b-0 hover:bg-black/[0.02]"
                        >
                          <td className="px-5 py-5 text-black/80">{r.itemType}</td>
                          <td className="px-5 py-5 font-medium text-black">{r.questions}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  