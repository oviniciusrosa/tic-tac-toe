import React from "react";
import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  delay?: number;
};

export function SlideUpEntrance(props: Props) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay: props.delay || 0 }}
    >
      {props.children}
    </motion.div>
  );
}
