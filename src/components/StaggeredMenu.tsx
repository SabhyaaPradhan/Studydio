"use client";

import { motion, useAnimate } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import "./StaggeredMenu.css";

const StaggeredMenu = () => {
  const [hovered, setHovered] = useState(false);
  const [scope, animate] = useAnimate();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const links = [
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "Pricing",
      href: "#pricing",
    },
    {
      name: "About",
      href: "#about",
    },
  ];

  useEffect(() => {
    if (!scope.current) return;

    const handleMouseEnter = () => {
      setHovered(true);
    };

    const handleMouseLeave = () => {
      setHovered(false);
    };

    scope.current.addEventListener("mouseenter", handleMouseEnter);
    scope.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (scope.current) {
        scope.current.removeEventListener("mouseenter", handleMouseEnter);
        scope.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [scope]);

  useEffect(() => {
    if (!isMounted) return;

    if (hovered) {
      animate([
        [
          ".letter",
          { y: -32 },
          {
            duration: 0.2,
            delay: (i) => i * 0.025,
            ease: "easeOut",
          },
        ],
        [
          "li",
          {
            opacity: 1,
            y: 0,
            scale: 1,
          },
          {
            duration: 0.3,
            delay: (i) => i * 0.05,
            at: "-0.1",
          },
        ],
        [
          ".sm-line",
          {
            scaleX: 1,
          },
          {
            duration: 0.3,
            at: "<",
            ease: "easeOut",
          },
        ],
      ]);
    } else {
      animate([
        [
          ".sm-line",
          {
            scaleX: 0,
          },
          {
            duration: 0.2,
            ease: "easeIn",
          },
        ],
        [
          ".letter",
          { y: 0 },
          {
            duration: 0.01,
          },
        ],
        [
          "li",
          {
            opacity: 0,
            y: 20,
            scale: 0.9,
          },
          {
            duration: 0.2,
            delay: (i) => i * 0.05,
            at: "<",
            ease: "easeIn",
          },
        ],
      ]);
    }
  }, [hovered, isMounted, animate]);

  return (
    <div
      ref={scope}
      className={cn("sm-container", !isMounted && "sm-hidden-on-load")}
    >
      <div className="sm-prelayers" aria-hidden="true">
        <div className="sm-top-layer">
          <p className="sm-layer-text">Menu</p>
        </div>
        <div className="sm-bottom-layer" />
      </div>
      <motion.button
        className="sm-button"
        aria-label="Toggle menu"
        whileTap={{ scale: 0.95 }}
      >
        <span className="sm-button-text">
          {"Menu".split("").map((l, i) => (
            <span key={i} className="letter-wrapper">
              <span className="letter">{l}</span>
              <span className="letter-hover">{l}</span>
            </span>
          ))}
        </span>
      </motion.button>
      <ul className="sm-links">
        {links.map((link) => (
          <motion.li
            key={link.name}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <Link
              href={link.href}
              className={cn(
                "sm-link",
                pathname === link.href && "sm-link-active"
              )}
            >
              {link.name}
            </Link>
          </motion.li>
        ))}
        <motion.div
          className="sm-line"
          initial={{ scaleX: 0 }}
        />
      </ul>
    </div>
  );
};

export default StaggeredMenu;
