"use server"

import { promises as fs } from "fs"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "projects.json")

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch (error) {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Get all projects
export async function getProjects() {
  try {
    await ensureDataDirectory()

    try {
      const data = await fs.readFile(dataFilePath, "utf8")
      return JSON.parse(data)
    } catch (error) {
      // If file doesn't exist or is invalid, return empty array
      await fs.writeFile(dataFilePath, JSON.stringify([], null, 2))
      return []
    }
  } catch (error) {
    console.error("Error reading projects:", error)
    return []
  }
}

// Add a new project
export async function addProject(project: any) {
  try {
    await ensureDataDirectory()

    let projects = []

    try {
      const data = await fs.readFile(dataFilePath, "utf8")
      projects = JSON.parse(data)
    } catch (error) {
      // If file doesn't exist or is invalid, create new array
      projects = []
    }

    // Add new project to the beginning of the array
    projects.unshift(project)

    // Write updated projects back to file
    await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2))

    return { success: true }
  } catch (error) {
    console.error("Error adding project:", error)
    throw new Error("Failed to add project")
  }
}

