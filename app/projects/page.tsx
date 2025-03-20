import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DotBackground } from "@/components/dot-background"
import { Toaster } from "@/components/ui/toaster"
import { ProjectCard } from "@/components/project-card"
import { getProjects } from "@/lib/projects"


export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen flex flex-col relative">
      <DotBackground />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-4xl font-bold mb-2 text-center">My Projects</h1>
        <div className="w-20 h-1 bg-primary mx-auto mb-10 rounded-full"></div>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-center text-lg">
            Here's a collection of projects I've worked on. Each project represents different skills and technologies
            I've used throughout my development journey.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p className="text-xl">No projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}

