"use client"

import { motion } from "framer-motion"

export function TechStack() {
  const techStack = [
    { name: "MongoDB", icon: "mongodb" },
    { name: "React", icon: "react" },
    { name: "HTML", icon: "html" },
    { name: "CSS", icon: "css" },
    { name: "Javascript", icon: "js" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "Discord", icon: "discordjs" },
    { name: "Flutter", icon: "flutter" },
    { name: "Postman", icon: "postman" },
    { name: "Node.js", icon: "nodejs" },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16">
      <motion.h2
        className="text-3xl font-bold mb-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Tech Stack
      </motion.h2>
      <motion.div
        className="w-20 h-1 bg-primary mx-auto mb-10 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      />

      <motion.div
        className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {techStack.map((tech) => (
          <motion.div key={tech.icon} variants={item} className="flex flex-col items-center">
            <motion.div
              className="w-16 h-16 rounded-xl flex items-center justify-center bg-background border border-gray-400 hover:border-primary transition-colors duration-300 overflow-hidden p-2"
              whileHover={{ y: -5, borderColor: "hsl(var(--primary))" }}
            >
              <img
                src={`https://skillicons.dev/icons?i=${tech.icon}`}
                alt={tech.name}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <span className="text-xs mt-2 font-medium text-center block">{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

