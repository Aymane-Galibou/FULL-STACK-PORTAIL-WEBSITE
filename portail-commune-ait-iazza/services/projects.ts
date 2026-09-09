
const BACKEND_DOMAIN =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export async function getProjects() {
  try {
    const res = await fetch(`${BACKEND_DOMAIN}/projects`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }

    const data = await res.json();
    
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}