import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const BACKEND_DOMAIN =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

async function getProjectById(id: string) {
  try {
    const res = await fetch(`${BACKEND_DOMAIN}/projects/${id}`, {
      next: { revalidate: 60 },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch project: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching single project:", error);
    return null;
  }
}

export default async function SingleProjectPage({ params }: PageProps) {
  const { id } = await params;

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-275 mx-auto px-6">
        <ProjectDetail project={project} />
      </div>
    </main>
  );
}
