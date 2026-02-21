
export default function Stat({ data }) {
    if (!data || !Array.isArray(data)) return null;
  
    return (
      <section className="w-full px-6 md:px-14 py-14 relative">
        {/* Tag (RIGHT aligned) */}
        <div className="absolute top-0 right-6 md:right-14">
          <span className="inline-flex items-center rounded-md bg-lime-200/70 px-3 py-1 text-sm font-medium text-black">
            Stats
          </span>
        </div>
  
        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {data.map((item) => {
            const { id, title, value, color } = item;
  
            if (!id || !title || !value || !color) return null;
  
            return (
              <div
                key={id}
                className="relative flex items-center bg-white rounded-full shadow-md overflow-hidden"
              >
                {/* Number block */}
                <div
                  className="flex items-center justify-center min-w-[90px] h-full text-white text-2xl font-semibold"
                  style={{ backgroundColor: color }}
                >
                  {String(id).padStart(2, "0")}
                </div>
  
                {/* Content */}
                <div className="px-6 py-4">
                  <p className="text-sm font-semibold uppercase text-black/70">
                    {title}
                  </p>
                  <p className="text-base md:text-lg text-black font-medium">
                    {value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  