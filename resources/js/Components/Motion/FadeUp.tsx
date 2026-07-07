import { motion, useReducedMotion, Variants } from 'motion/react';
import { ReactNode } from 'react';

interface FadeUpProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    y?: number;
    className?: string;
}

export default function FadeUp({ children, delay = 0, duration = 0.5, y = 20, className }: FadeUpProps) {
    const shouldReduceMotion = useReducedMotion();

    const variants: Variants = {
        hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: shouldReduceMotion ? 0 : duration,
                delay: shouldReduceMotion ? 0 : delay,
                ease: 'easeOut' as const,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
