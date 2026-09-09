"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useTransition } from "react";

export default function SmartLink({
  className,
  href,
  children,
  setState,
}: {
  className?: string;
  href: string;
  children: React.ReactNode;
  setState?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey) return;

    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (setState) {
      setState("");
    }
    if (href.startsWith("/")) {
      e.preventDefault();

      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      startTransition(() => {
        router.push(href, { scroll: false });
      });
    }
  };

  return (
    <>
      <Link
        href={href}
        onClick={handleClick}
        className={className}
        scroll={false}
      >
        {children}
      </Link>

      {isPending && (
        <div className="fixed inset-0 z-9999 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gate-beige border-t-transparent rounded-full animate-spin" />
            <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase">
              Chargement...
            </span>
          </div>
        </div>
      )}
    </>
  );
}
