import { ProjectCard } from "@/components/project-card"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DotBackground } from "@/components/dot-background"
import { TechStack } from "@/components/tech-stack"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/projects"


export default async function Home() {
  const projects = await getProjects()
  const featuredProjects = projects.slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col relative">
      <DotBackground />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16 relative z-10">
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-600 md:font-md">
              Typicalsleepingboy
            </h1>
            <p className="text-xl text-muted-foreground mb-8">Beginner Frontend, Backend & UI/UX Enthusiast</p>
          </div>
        </section>

        <TechStack />

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-center">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10 rounded-full"></div>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-4">
              Hi there! I'm a passionate developer focused on creating modern, responsive, and user-friendly web
              applications. I specialize in front-end development with React,Next.js and Html, but I'm also comfortable
              working with back-end technologies.
            </p>
            <p className="text-lg mb-6">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
              enjoying a good cup of coffee while reading tech blogs.
            </p>
            <div className="flex justify-center">
              <Button asChild className="rounded-full">
                <Link href="/about">Learn More About Me</Link>
              </Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-2 text-center">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10 rounded-full"></div>

          {featuredProjects.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <p>No projects yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              <div className="flex justify-center">
                <Button asChild variant="outline" className="rounded-full border-gray-400">
                  <Link href="/projects">View All Projects</Link>
                </Button>
              </div>
            </>
          )}
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-2 text-center">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10 rounded-full"></div>
          <div className="text-center max-w-xl mx-auto">
            <p className="text-lg mb-6">
              Interested in working together? Feel free to reach out to discuss your project or just say hello!
            </p>
            <Button asChild className="rounded-full">
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}

