import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DotBackground } from "@/components/dot-background"
import { Toaster } from "@/components/ui/toaster"
import { TechStack } from "@/components/tech-stack"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <DotBackground />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-4xl font-bold mb-2 text-center">About Me</h1>
        <div className="w-20 h-1 bg-primary mx-auto mb-10 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
          <div className="flex justify-center items-center">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-gray-400">
              <Image
                src="https://res.cloudinary.com/dlx2zm7ha/image/upload/v1742442871/lo6uawutzt9a8axqpmdv.jpg"
                alt="Profile"
                width={256}
                height={256}
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Andi Muh Naufal Dzaky</h2>
            <p className="text-muted-foreground mb-4">Beginner Frontend, Backend & UI/UX Enthusiast</p>

            <div className="space-y-4">
              <p>
              I am a passionate beginner developer with a focus on building modern, responsive, and easy-to-use web applications.
              </p>
              <p>
                My journey in programming started with HTML and CSS, and I've since expanded my skills to include
                JavaScript, React, Node.js, and various other technologies.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">My Journey</h2>
          <div className="space-y-6">
            <p>
            I started my coding journey in 3rd grade of vocational school, teaching myself HTML and CSS to build simple websites. 
            As my interest grew, I delved deeper into JavaScript and eventually discovered React, which became my framework of choice for front-end development.
            </p>
            <p>
              In 2020, I expanded my skills to include back-end development with Node.js and MongoDB, allowing me to
              build full-stack applications. I've also worked with various APIs and third-party services to create more
              dynamic and feature-rich applications.
            </p>
            <p>
              Throughout my journey, I've maintained a strong focus on clean code, performance optimization, and user
              experience. I believe that the best applications are not only functional but also intuitive and enjoyable
              to use.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
          <TechStack />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Front-end Development</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Responsive web design</li>
                <li>Single-page applications</li>
                <li>UI/UX implementation</li>
                <li>Performance optimization</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Back-end Development</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>RESTful API development</li>
                <li>Database design and management</li>
                <li>Authentication and authorization</li>
                <li>Server deployment and maintenance</li>
                <li>Discord bot development</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}

