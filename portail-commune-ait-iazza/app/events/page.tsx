"use client";
import { useLang } from "@/context/langContext";
import React from "react";

function page() {
  const { lang } = useLang();
  return (
    <>
      <div className="relative py-24">
        {/* background-effect */}
        <div className="absolute inset-0 bg-linear-to-b from-gate-beige/60 via-gate-beige/30 to-slate-50 h-[70%]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* header */}
          <div
            className={`flex flex-col mb-20 ${lang === "AR" ? "items-end text-right" : "items-start text-left"}`}
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] ${lang === "AR" ? "font-arabic" : "font-sans uppercase tracking-tighter"}`}
            >
              {lang === "AR" ? "أيت إعزة" : "Aït Iazza"} <br />
              {/* Container for the highlighted word */}
              <span className="relative inline-block mt-4">
                {/* The Actual Text Box */}
                <span className="relative z-20 block bg-slate-900 text-gate-beige px-6 py-2 shadow-xl">
                  {lang === "AR" ? "في أرقام" : "En Chiffres"}
                </span>

                {/* The Decorative Offset Border */}
                <span
                  className="absolute inset-0 border-2 border-slate-900 translate-x-2 translate-y-2 z-10"
                  aria-hidden="true"
                />
              </span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
