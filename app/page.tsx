"use client";

import { motion } from "framer-motion";
import { Code, User, Mail, Briefcase } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Background3D } from "@/components/Background3D";
import { LinkCard } from "@/components/LinkCard";
import Image from "next/image";

const links = [
  { title: "Portfolio Projects", href: "#", icon: Briefcase },
  { title: "LinkedIn", href: "#", icon: User },
  { title: "GitHub", href: "#", icon: Code },
  { title: "Contact Me", href: "#", icon: Mail },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden">
      <Background3D />
      <ThemeToggle />

      <div className="z-10 w-full max-w-xl mx-auto flex flex-col items-center mt-12 mb-20 gap-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-maroon-500/30 dark:bg-maroon-500/50 blur-xl scale-125 animate-pulse" />
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/40 dark:border-white/20 backdrop-blur-sm shadow-2xl">
              <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Xavier&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf"
                alt="Xavier Avatar"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-maroon-950 dark:text-white drop-shadow-sm">
              Xavier
            </h1>
            <p className="mt-2 text-maroon-800/80 dark:text-maroon-100/70 font-medium">
              Informatics Engineering Student | Freelance Web Developer
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col gap-4"
        >
          {links.map((link, idx) => (
            <LinkCard
              key={idx}
              title={link.title}
              href={link.href}
              icon={link.icon}
            />
          ))}
        </motion.div>
      </div>
    </main>
  );
}
