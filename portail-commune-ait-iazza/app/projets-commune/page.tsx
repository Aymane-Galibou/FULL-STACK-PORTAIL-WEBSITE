import ProjectsList from "@/components/projects/ProjctsList";


export default async function ProjectsPage() {

  return (
    <main className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-375 mx-auto px-6">
        <ProjectsList primaryPage={true} />
      </div>
    </main>
  );
}