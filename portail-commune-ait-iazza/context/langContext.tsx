"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface langContextType {
  lang: "AR" | "FR";
  setlang: (lg: "AR" | "FR") => void;
}

const langContext = createContext<langContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  //

  const [lang, setlangState] = useState<"FR" | "AR">("FR");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    //
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };

    const savedLang = getCookie("user_lang") as "AR" | "FR" | undefined;

    if (savedLang && (savedLang === "AR" || savedLang === "FR")) {
      setlangState(savedLang);
    } else {
      //
      const browserLang = navigator.language.startsWith("ar") ? "AR" : "FR";
      setlang(browserLang);
    }

    setIsHydrated(true);
  }, []);

  //
  const setlang = (lg: "AR" | "FR") => {
    setlangState(lg);
    document.cookie = `user_lang=${lg}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
  };

  if (!isHydrated) return null;

  return (
    <langContext.Provider value={{ lang, setlang }}>
      <div>{children}</div>
    </langContext.Provider>
  );
}

export function useLang() {
  const context = useContext(langContext);
  if (!context) throw new Error("the context is not found");
  return context;
}
