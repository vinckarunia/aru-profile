import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

interface AnimatedNumberProps {
    value: string;
    duration?: number; // duration in milliseconds
}

export default function AnimatedNumber({ value, duration }: AnimatedNumberProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const shouldReduceMotion = useReducedMotion();
    const [displayVal, setDisplayVal] = useState<string>('');

    // Parse the value into prefix, numeric, and suffix parts
    const match = value.match(/^([^\d]*)([\d,.]+)([^\d]*)$/);
    
    useEffect(() => {
        if (!match) {
            setDisplayVal(value);
            return;
        }

        const prefix = match[1];
        const numberStr = match[2].replace(/,/g, '');
        const suffix = match[3];
        const numericTarget = Number(numberStr);

        if (isNaN(numericTarget)) {
            setDisplayVal(value);
            return;
        }

        // If reduced motion is requested, show the final target immediately
        if (shouldReduceMotion) {
            setDisplayVal(value);
            return;
        }

        if (isInView) {
            // Determine animation duration in seconds
            let animDuration = 1.0;
            if (duration) {
                animDuration = duration / 1000;
            } else {
                // Dynamic duration based on numeric target:
                // 20 -> 900ms, 28 -> 1000ms, 1000 -> 1200ms
                if (numericTarget <= 20) {
                    animDuration = 0.9;
                } else if (numericTarget <= 28) {
                    // interpolate linearly between 20 and 28
                    animDuration = 0.9 + ((numericTarget - 20) / (28 - 20)) * 0.1;
                } else if (numericTarget <= 1000) {
                    // interpolate linearly between 28 and 1000
                    animDuration = 1.0 + ((numericTarget - 28) / (1000 - 28)) * 0.2;
                } else {
                    animDuration = 1.2;
                }
            }

            const controls = animate(0, numericTarget, {
                duration: animDuration,
                ease: 'easeOut',
                onUpdate: (latest) => {
                    const rounded = Math.round(latest);
                    // Format number with commas if the original number had commas
                    const formatted = match[2].includes(',') 
                        ? rounded.toLocaleString('id-ID')
                        : rounded.toString();
                    setDisplayVal(`${prefix}${formatted}${suffix}`);
                }
            });

            return () => controls.stop();
        } else {
            // Initial state is 0 with prefix/suffix
            setDisplayVal(`${prefix}0${suffix}`);
        }
    }, [value, isInView, shouldReduceMotion, duration]);

    return (
        <span ref={ref} className="inline-block">
            {displayVal}
        </span>
    );
}
