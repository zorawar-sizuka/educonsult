// src/components/Test-Comp/Intro.jsx
export default function Introduction({ data }) {
    if (!data) return null;
  
    const { label, heading, subtext } = data;
  
    if (!label || !heading) return null;
  
    return (
      <section className="w-full bg-white px-6 md:px-14 py-10 md:py-14">
        <div className="max-w-5xl">
          <span className="inline-flex items-center rounded-md bg-lime-200/70 px-3 py-1 text-sm font-medium text-black">
            {label}
          </span>
  
          <h2 className="mt-6 text-3xl md:text-5xl font-medium leading-tight text-black">
            {heading}
          </h2>
  
          {subtext ? (
            <p className="mt-5 text-base md:text-lg text-black/70 leading-relaxed">
              {subtext}
            </p>
          ) : null}
        </div>
      </section>
    );
  }
  