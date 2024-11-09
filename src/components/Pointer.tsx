import React from "react"
import { motion } from "framer-motion"

interface PointerProps {
    spinning: boolean
    onSpinComplete: () => void
}

export const Pointer: React.FC<PointerProps> = ({
    spinning,
    onSpinComplete,
}) => {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            animate={{
                rotate: spinning ? [0, 1800 + Math.random() * 360] : 0,
            }}
            transition={{
                duration: spinning ? 3 : 0,
                ease: spinning ? "easeInOut" : "linear",
                onComplete: onSpinComplete,
            }}
            style={{
                width: "40px",
                height: "40px",
                transformOrigin: "center center",
            }}
        >
            <div className="relative w-full h-full">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-20 bg-red-600 rounded-full transform -translate-y-8" />
                    <div className="w-6 h-6 rounded-full bg-gray-800 border-4 border-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>
        </motion.div>
    )
}
