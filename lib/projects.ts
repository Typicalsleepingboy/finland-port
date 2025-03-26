"use server"

import { put, list, del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export async function getProjects(): Promise<Project[]> {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("BLOB_READ_WRITE_TOKEN is not configured")
    }

    const { blobs } = await list({
      prefix: "projects/",
      token: process.env.BLOB_READ_WRITE_TOKEN
    })

    if (!blobs.length) return []

    const projects = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const response = await fetch(blob.url)
          if (!response.ok) throw new Error(`Failed to fetch ${blob.url}`)
          return await response.json()
        } catch (error) {
          console.error(`Error processing blob ${blob.url}:`, error)
          return null
        }
      })
    )

    // Filter out null values and validate project shape
    return projects
      .filter((project): project is Project => (
        project !== null &&
        typeof project === 'object' &&
        'id' in project &&
        'title' in project &&
        'description' in project
      ))
      .sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime())
      
  } catch (error) {
    console.error("Error in getProjects:", error)
    throw new Error("Failed to load projects")
  }
}

export async function addProject(project: Project) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("BLOB_READ_WRITE_TOKEN is not configured")
    }

    // Validate required fields
    if (!project.id || !project.title || !project.description) {
      throw new Error("Missing required project fields")
    }

    const blob = await put(
      `projects/${project.id}.json`,
      JSON.stringify({
        ...project,
        tags: Array.isArray(project.tags) ? project.tags : [],
        image: project.image || "/placeholder.svg"
      }),
      {
        contentType: "application/json",
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN
      }
    )

    revalidatePath("/projects")
    revalidatePath("/")
    
    return { 
      success: true, 
      blob,
      projectId: project.id
    }
  } catch (error) {
    console.error("Error in addProject:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to add project",
      projectId: project.id
    }
  }
}

export async function deleteProject(id: string) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("BLOB_READ_WRITE_TOKEN is not configured")
    }

    if (!id) throw new Error("Project ID is required")

    await del(`projects/${id}.json`, {
      token: process.env.BLOB_READ_WRITE_TOKEN
    })

    revalidatePath("/projects")
    revalidatePath("/")
    
    return { 
      success: true,
      projectId: id
    }
  } catch (error) {
    console.error("Error in deleteProject:", error)
    return { 
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete project",
      projectId: id
    }
  }
}