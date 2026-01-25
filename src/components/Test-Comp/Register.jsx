// src/components/Test-Comp/Register.jsx
export default function Register({ data }) {
    if (
      !data ||
      !data.title ||
      !data.intro ||
      !Array.isArray(data.steps)
    )
      return null;
  
    const { title, intro, steps } = data;
  
    return (
      <section className="w-full px-6 md:px-14 py-16 relative">
        {/* Tag — RIGHT aligned */}
        <div className="absolute top-0 right-6 md:right-14">
          <span className="inline-flex items-center rounded-md bg-lime-200/70 px-3 py-1 text-sm font-medium text-black">
            Register
          </span>
        </div>
  
        <div className="max-w-4xl mx-auto mt-10">
          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-black">
            {title}
          </h2>
  
          <p className="mt-4 text-black/70 text-base md:text-lg leading-relaxed">
            {intro}
          </p>
  
          {/* Steps */}
          <div className="mt-10 space-y-6">
            {steps.map((step, idx) => {
              const { text, highlight, color } = step;
              if (!text) return null;
  
              return (
                <div
                  key={idx}
                  className="relative flex gap-5 rounded-2xl border border-black/10 bg-white p-6"
                >
                  {/* Number — dimmed color treatment */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-semibold"
                    style={{
                      backgroundColor: `${color ?? "#111827"}20`, // dimmed
                      color: color ?? "#111827",
                    }}
                  >
                    {idx + 1}
                  </div>
  
                  {/* Content */}
                  <div className="text-black/80 leading-relaxed">
                    <p>
                      {highlight ? (
                        <>
                          <span className="font-semibold text-black">
                            {highlight}
                          </span>{" "}
                          {text}
                        </>
                      ) : (
                        text
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
  
          {/* Bottom hint / reassurance */}
          <div className="mt-10 rounded-2xl bg-black/[0.03] p-6">
            <p className="text-sm text-black/70">
              Tip: Always carry a valid{" "}
              <span className="font-medium">identification document</span> on
              the test day. Registration steps may vary slightly by location.
            </p>
          </div>
        </div>
      </section>
    );
  }
  