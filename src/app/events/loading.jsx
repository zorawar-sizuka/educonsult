// app/events/loading.jsx
import LottieLoader from "./LottieLoader";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <LottieLoader />

        <h2 className="mt-8 text-3xl md:text-5xl font-serif text-slate-900 leading-tight">
          Syncing events…
        </h2>
        <p className="mt-3 text-slate-500 text-base md:text-lg">
          Pulling seminars, workshops & info sessions around Kathmandu.
        </p>
      </div>
    </div>
  );
}
