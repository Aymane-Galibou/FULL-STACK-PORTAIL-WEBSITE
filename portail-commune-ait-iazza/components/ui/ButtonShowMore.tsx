import React from "react";
import SmartLink from "./SmartLink";

function ButtonShowMore({
  isAr,
  titre,
  href,
}: {
  isAr: boolean;
  titre: { FR: string; AR: string };
  href: string;
}) {
  return (
    <div className="mt-16 flex justify-center">
      <SmartLink
        href={href}
        className="group flex items-center gap-3 px-8 py-4 bg-white border-2 border-gate-beige rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-gate-beige hover:text-white transition-all duration-300 shadow-lg"
      >
        <span className={isAr ? "font-arabic" : "font-sans"}>
          {isAr ? titre["AR"] : titre["FR"]}
        </span>
      </SmartLink>
    </div>
  );
}

export default ButtonShowMore;
