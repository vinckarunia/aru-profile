import { motion, useReducedMotion, Variants } from 'motion/react';
import { ReactNode } from 'react';

interface StaggerProps {
    children: ReactNode;
    staggerDelay?: number;
    delay?: number;
    className?: string;
    viewportAmount?: number;
    useViewport?: boolean;
}

export function Stagger({
    children,
    staggerDelay = 0.08,
    delay = 0,
    className,
    viewportAmount = 0.1,
    useViewport = true,
}: StaggerProps) {
    const shouldReduceMotion = useReducedMotion();

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
                delayChildren: shouldReduceMotion ? 0 : delay,
            },
        },
    };

    if (useViewport) {
        return (
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: viewportAmount }}
                variants={containerVariants}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerItemProps {
    children: ReactNode;
    y?: number;
    duration?: number;
    className?: string;
    as?: 'div' | 'li' | 'span' | 'h2' | 'h3' | 'h4' | 'p' | 'a';
    [key: string]: any;
}

export function StaggerItem({
    children,
    y = 20,
    duration = 0.45,
    className,
    as = 'div',
    ...rest
}: StaggerItemProps) {
    const shouldReduceMotion = useReducedMotion();

    const itemVariants: Variants = {
        hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: shouldReduceMotion ? 0 : duration,
                ease: 'easeOut' as const,
            },
        },
    };

    const Component = motion[as];

    return (
        <Component variants={itemVariants} className={className} {...rest}>
            {children}
        </Component>
    );
}
