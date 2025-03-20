"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"

interface Project {
    id: string
    title: string
    description: string
    image: string
    tags: string[]
    liveUrl?: string
    githubUrl?: string
}

export function ProjectList({ initialProjects }: { initialProjects: Project[] }) {
    const [projects, setProjects] = useState<Project[]>(initialProjects)

    return (
        <>
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
        </>
    )
}

