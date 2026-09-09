"use client"
import CouncilMembersGrid from "@/components/ConcilMembersGrid";
import { useLang } from "@/context/langContext";
import { fetchCouncilMembers } from "@/services/councilMember";
import { CouncilMember } from "@/types/concil";
import { useEffect, useState } from "react";


export default function BureauPage() {
  const { lang } = useLang();

  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadMembers() {
      setIsLoading(true);
      // Fetches bureau members sorted by bureauOrder ASC, id ASC from Express
      const data = await fetchCouncilMembers(true);

      if (isMounted) {
        setMembers(data);
        setIsLoading(false);
      }
    }

    loadMembers();

    return () => {
      isMounted = false;
    };
  }, []);

      if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  return (
    <main>
      <CouncilMembersGrid 
        members={members} 
        lang={lang} 
      />
    </main>
  );
}