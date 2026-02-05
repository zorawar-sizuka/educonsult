// components/events/LottieLoader.jsx
"use client";

import Lottie from "lottie-react";
import animationData from "../../../../public/lottie/events.json";

export default function LottieLoader() {
  return (
    <div className="mx-auto w-64 h-64 md:w-94 md:h-92">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}
