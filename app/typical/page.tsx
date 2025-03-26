"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { addProject } from "@/lib/projects"
import { DotBackground } from "@/components/dot-background"

// Define the project schema with proper types
const projectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  image: z.string().url({ message: "Please enter a valid URL" }).optional(),
  tags: z.string().transform((val) => val.split(",").map((tag) => tag.trim())),
  liveUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  githubUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
})

type ProjectFormValues = z.infer<typeof projectSchema>

// Define the Project interface to match the expected types
interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[] // This is an array of strings
  liveUrl?: string
  githubUrl?: string
}

export default function AdminPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      tags: "",
      liveUrl: "",
      githubUrl: "",
    },
  })

  async function onSubmit(data: ProjectFormValues) {
    setIsSubmitting(true)
    try {
      // Create a project object with the correct types
      const projectData: Project = {
        id: uuidv4(),
        title: data.title,
        description: data.description,
        image: data.image || "/placeholder.svg?height=200&width=400",
        tags: data.tags, // This is already transformed to string[] by zod
        liveUrl: data.liveUrl || undefined,
        githubUrl: data.githubUrl || undefined,
      }

      await addProject(projectData)

      toast({
        title: "Project Added",
        description: "Your project has been successfully added to the portfolio",
      })

      form.reset()
      router.refresh()
    } catch (error) {
      console.error("Error adding project:", error)
      toast({
        title: "Error",
        description: "Failed to add project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <DotBackground />
      <div className="w-full max-w-2xl relative z-10">
        <Card className="border border-primary/20 shadow-lg backdrop-blur-sm bg-background/80">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Admin Dashboard</CardTitle>
            <CardDescription className="text-center">Add a new project to your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="My Awesome Project" {...field} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief description of your project"
                          {...field}
                          rows={4}
                          className="bg-background/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} className="bg-background/50" />
                      </FormControl>
                      <FormDescription>Leave blank to use a placeholder image</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="React, Next.js, Tailwind" {...field} className="bg-background/50" />
                      </FormControl>
                      <FormDescription>Comma-separated list of technologies used</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="liveUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Live Demo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://myproject.com" {...field} className="bg-background/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://github.com/username/repo"
                            {...field}
                            className="bg-background/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Adding Project..." : "Add Project"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={() => router.push("/")} className="mt-2">
              Back to Homepage
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

