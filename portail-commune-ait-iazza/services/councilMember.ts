// src/lib/api/councilMembers.ts
const BACKEND_DOMAIN =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export async function fetchCouncilMembers(bureauOnly = false) {
  try {
    const url = `${BACKEND_DOMAIN}/council-members${bureauOnly ? "?bureau=true" : ""}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch council members: ${res.statusText}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("Error fetching council members:", error);
    return [];
  }
}