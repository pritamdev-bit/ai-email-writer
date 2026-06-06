import { forwardRef } from "react";
import { motion } from "motion/react";
import type { AnimatedIconProps } from "./types";

const Cloud3Icon = forwardRef<SVGSVGElement, AnimatedIconProps>(
  (
    { size = 300, color = "gray", strokeWidth = 2, className = "" },
    ref,
  ) => {
    return (
      <motion.svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.path
          className="cloud-path"
          d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
          style={{ transformOrigin: "center center" }}
          animate={{
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.circle
          cx="9"
          cy="15"
          r="0.5"
          fill={color}
          animate={{
            opacity: [1, 0.4, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0,
          }}
        />

        <motion.circle
          cx="12"
          cy="15"
          r="0.5"
          fill={color}
          animate={{
            opacity: [1, 0.4, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />

        <motion.circle
          cx="15"
          cy="15"
          r="0.5"
          fill={color}
          animate={{
            opacity: [1, 0.4, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        />
      </motion.svg>
    );
  },
);

Cloud3Icon.displayName = "Cloud3Icon";

export default Cloud3Icon;