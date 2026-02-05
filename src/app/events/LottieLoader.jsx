// components/events/LottieLoader.jsx
"use client";

import Lottie from "lottie-react";
import animationData from "../../../public/lottie/events.json";

export default function LottieLoader() {
  return (
    <div className="mx-auto w-56 h-56 md:w-72 md:h-72">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}
