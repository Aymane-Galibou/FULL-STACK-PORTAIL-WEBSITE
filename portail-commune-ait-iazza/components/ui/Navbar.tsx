"use client";
import Image from "next/image";
import background from "../../public/bannerPortail.png";
import { useState } from "react";
import logo from "../../public/icon.png";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLang } from "@/context/langContext";
import SmartLink from "./SmartLink";
import { navElement } from "@/data/navbarItems";

function Navbar() {
  const [whoOpened, setwhoOpened] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const { lang, setlang } = useLang();
  return (
    <>
      {/* banner1 */}
      <div className="relative w-full h-35  overflow-hidden hidden md:flex">
        <Image
          src={background}
          alt="En-tête Officiel Royaume du Maroc"
          fill
          priority
          className="object-cover md:object-fill"
        />
      </div>

      {/* Navbar*/}
      <div
        className={`w-full z-50 flex justify-between  items-center px-6 md:px-12 transition-all duration-300 sticky top-0 shadow shadow-black bg-white py-4 `}
      >
        {/* left part */}
        <SmartLink href={"/"} className="flex items-center gap-4">
          <div className="relative w-12 h-10 md:w-16 md:h-12">
            <Image
              src={logo}
              fill
              alt="Logo Ait Iazza"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[#1E3A8A] font-black text-lg md:text-xl leading-none tracking-tighter">
              COMMUNE <span className="text-[#F59E0B]">AIT IAZZA</span>
            </h1>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest hidden md:block">
              Province de Taroudant
            </span>
          </div>
        </SmartLink>

        {/* navbar Desktop */}
        <ul
          dir={lang === "AR" ? "rtl" : "ltr"}
          className={`hidden xl:flex items-center gap-5 font-black  tracking-wide transition-all duration-300
    ${lang === "AR" ? `font-arabic text-right ` : `text-left font-sans`}`}
        >
          {navElement[lang].map((item) => (
            <li
              key={item.id}
              className="relative"
              onMouseEnter={() => setwhoOpened(item.titre)}
              onMouseLeave={() => setwhoOpened("")}
            >
              <button className="flex items-center gap-1 hover:text-[#F59E0B]">
                {item.titre}{" "}
                <ChevronDown
                  size={14}
                  className={
                    whoOpened === item.titre
                      ? "rotate-180 transition-transform"
                      : ""
                  }
                />
              </button>
              {whoOpened === item.titre && (
                <div
                  className={`absolute top-full ${lang === "AR" ? "-right-4" : "right-4"} w-56 pt-2 animate-fade-in`}
                >
                  <div className="bg-white rounded-lg shadow-2xl border border-slate-100  overflow-hidden">
                    {item.children.map((child) => (
                      <SmartLink
                      setState={setwhoOpened}
                        key={child.childTitre}
                        href={child.href}
                        className="block px-4 py-3 text-sm  hover:bg-amber-50 rounded-lg text-slate-600"
                      >
                        {child.childTitre}
                      </SmartLink>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
          <li className="flex items-center bg-white rounded-full border border-slate-200 p-0.5">
            <button
              onClick={() => setlang("FR")}
              className={`px-3 py-0.5 rounded-full ${lang === "FR" ? "bg-[#3D6ADD] text-white" : "hover:text-[#ff8c00] text-[#3D6ADD]"}  text-[10px] font-bold transition-all`}
            >
              FR
            </button>
            <button
              onClick={() => setlang("AR")}
              className={`px-3 py-0.5 rounded-full  ${lang === "AR" ? "bg-[#3D6ADD] text-white" : "hover:text-[#ff8c00] text-[#3D6ADD]"} text-[10px] font-bold transition-all`}
            >
              AR
            </button>
          </li>
        </ul>

        {/* navbar phone  */}
        <div className="xl:hidden">
          {/* Bouton Burger - Fixé en haut à droite (ou gauche selon AR) */}
          <button
            onClick={toggleDrawer}
            className="p-2 hover:text-gate-orange transition-colors"
          >
            <Menu size={28} />
          </button>

          {/* Overlay Sombre */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-100 backdrop-blur-sm"
              onClick={toggleDrawer}
            />
          )}

          {/* Le Drawer */}
          <div
            className={`fixed top-0 bottom-0 w-75 bg-white z-101 shadow-2xl transition-transform duration-300 ease-in-out transform 
        ${isOpen ? "translate-x-0" : lang === "AR" ? "translate-x-full" : "-translate-x-full"} 
        ${lang === "AR" ? "right-0" : "left-0"}`}
          >
            {/* Header du Drawer */}
            <div
              className={`flex items-center justify-between p-6 border-b border-slate-100 ${lang === "AR" ? "flex-row-reverse font-arabic" : ""}`}
            >
              <span className="font-black text-gate-blue text-xl">
                {lang === "AR" ? "بوابة المدينة" : "Portail de ville"}
              </span>
              <button
                onClick={toggleDrawer}
                className="p-2 hover:bg-slate-50 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Liste des Liens */}
            <nav
              className={`p-4 h-[calc(100vh-160px)] overflow-y-auto ${lang === "AR" ? "text-right" : "text-left"}`}
            >
              <ul className="space-y-2">
                {navElement[lang].map((item) => (
                  <li
                    key={item.id}
                    className="border-b border-slate-50 last:border-0 pb-2"
                  >
                    <button
                      onClick={() =>
                        setOpenSubMenu(openSubMenu === item.id ? null : item.id)
                      }
                      className={`flex items-center justify-between w-full py-3 px-2 text-black font-bold 
                    ${lang === "AR" ? "font-arabic flex-row-reverse" : "font-sans"}`}
                    >
                      <span
                        className={`text-[15px] uppercase tracking-wide text-left`}
                      >
                        {item.titre}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${openSubMenu === item.id ? "rotate-180" : ""} ${lang === "AR" ? "text-gate-orange" : ""}`}
                      />
                    </button>

                    {/* Sous-Menu (Accordéon) */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out 
                  ${openSubMenu === item.id ? "max-h-100 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
                    >
                      <ul
                        className={`space-y-1 bg-slate-50 p-3 rounded-lg ${lang === "AR" ? "border-r-2" : "border-l-2"} border-gate-orange`}
                      >
                        {item.children.map((child) => (
                          <SmartLink
                            key={child.id}
                            href={child.href}
                            className={`block py-2 text-sm text-slate-600 hover:text-gate-blue transition-colors
                            ${lang === "AR" ? "font-arabic" : "font-sans"}`}
                          >
                            {child.childTitre}
                          </SmartLink>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer du Drawer (Changement de langue) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-50 flex items-center justify-center gap-4">
              <button
                onClick={() => setlang("AR")}
                className={`px-4 py-2 rounded-md font-arabic font-bold text-xs ${lang === "AR" ? "bg-black text-white" : "text-slate-500"}`}
              >
                العربية
              </button>
              <div className="w-px h-4 bg-slate-300" />
              <button
                onClick={() => setlang("FR")}
                className={`px-4 py-2 rounded-md font-sans font-bold text-xs ${lang === "FR" ? "bg-black text-white" : "text-slate-500"}`}
              >
                FRANÇAIS
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
