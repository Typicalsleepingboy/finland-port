"use server"

import { put, list, del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

// Type definition for a project
interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

// Get all projects
export async function getProjects(): Promise<Project[]> {
  try {
    // List all blobs with the prefix 'projects/'
    const { blobs } = await list({ prefix: "projects/" })

    if (blobs.length === 0) {
      return []
    }

    // Fetch and parse each project blob
    const projectPromises = blobs.map(async (blob) => {
      const response = await fetch(blob.url)
      return (await response.json()) as Project
    })

    const projects = await Promise.all(projectPromises)

    // Sort projects by most recent first (assuming they're named with timestamps or sequential IDs)
    return projects.sort((a, b) => {
      // You can customize this sorting logic if needed
      return b.id.localeCompare(a.id)
    })
  } catch (error) {
    console.error("Error reading projects:", error)
    return []
  }
}

// Add a new project
export async function addProject(project: Project) {
  try {
    // Store the project as a JSON blob
    await put(`projects/${project.id}.json`, JSON.stringify(project), {
      contentType: "application/json",
      access: "public", // Add the required access property
    })

    // Revalidate the projects page to show the new project
    revalidatePath("/projects")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error adding project:", error)
    throw new Error("Failed to add project")
  }
}

// Delete a project (optional, for future use)
export async function deleteProject(id: string) {
  try {
    await del(`projects/${id}.json`)
    revalidatePath("/projects")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error deleting project:", error)
    throw new Error("Failed to delete project")
  }
}

