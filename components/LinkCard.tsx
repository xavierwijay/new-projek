"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkCardProps {
  href: string;
  title: string;
  icon: LucideIcon;
  delay?: number;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function LinkCard({ href, title, icon: Icon }: LinkCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group relative flex items-center p-4 w-full rounded-2xl",
        "bg-white/20 dark:bg-black/20 backdrop-blur-md",
        "border border-white/30 dark:border-white/10",
        "shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
        "transition-all duration-300",
        "hover:border-maroon-400 dark:hover:border-maroon-500",
        "hover:shadow-[0_0_15px_rgba(194,59,85,0.4)] dark:hover:shadow-[0_0_20px_rgba(165,39,63,0.6)]"
      )}
    >
      <div className="flex items-center justify-center p-3 rounded-xl bg-white/20 dark:bg-black/30 text-maroon-700 dark:text-maroon-200">
        <Icon className="w-6 h-6" />
      </div>
      <span className="ml-4 font-semibold text-maroon-900 dark:text-maroon-50 text-lg">
        {title}
      </span>
      <div className="ml-auto opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <svg 
          className="w-5 h-5 text-maroon-600 dark:text-maroon-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.a>
  );
}