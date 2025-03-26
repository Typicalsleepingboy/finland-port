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

export async function addProject(project: Project) {
  try {
    if (!project.id || !project.title || !project.description) {
      throw new Error("Missing required fields");
    }

    // Ensure tags is always an array
    if (!Array.isArray(project.tags)) {
      project.tags = [];
    }

    await put(`projects/${project.id}.json`, JSON.stringify(project), {
      contentType: "application/json",
      access: "public",
    });

    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding project:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to add project" 
    };
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

