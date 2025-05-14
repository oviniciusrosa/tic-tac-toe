import React from "react";
import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  delay?: number;
};

export function Entrance(props: Props) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: props.delay || 0 }}
    >
      {props.children}
    </motion.div>
  );
}
