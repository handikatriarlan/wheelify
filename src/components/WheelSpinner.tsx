import React, { useCallback } from "react"
import { WheelSection } from "./WheelSection"
import { Pointer } from "./Pointer"

interface WheelProps {
    names: string[]
    spinning: boolean
    onSpinComplete: (winner: string) => void
    darkMode: boolean
    wheelColors: string[]
}

export const WheelSpinner: React.FC<WheelProps> = ({
    names,
    spinning,
    onSpinComplete,
    darkMode,
    wheelColors,
}) => {
    const radius = 150
    const center = radius + 50
    const totalSize = (center + 50) * 2

    const handleSpinComplete = useCallback(() => {
        if (names.length > 0) {
            const winner = names[Math.floor(Math.random() * names.length)]
            onSpinComplete(winner)
        }
    }, [names, onSpinComplete])

    return (
        <div
            className="relative mx-auto max-w-full"
            style={{ width: totalSize, height: totalSize }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${totalSize} ${totalSize}`}
                className={`transform transition-transform duration-300 ${
                    darkMode ? "filter-shadow-dark" : "filter-shadow-light"
                }`}
            >
                {/* Background circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill={darkMode ? "#1F2937" : "#F9FAFB"}
                    className="transition-colors duration-300"
                    stroke={darkMode ? "#374151" : "#E5E7EB"}
                    strokeWidth="2"
                />

                {/* Wheel sections */}
                {names.map((name, i) => (
                    <WheelSection
                        key={i}
                        name={name}
                        index={i}
                        total={names.length}
                        color={wheelColors[i % wheelColors.length]}
                        radius={radius}
                        center={center}
                        darkMode={darkMode}
                    />
                ))}
            </svg>

            <Pointer spinning={spinning} onSpinComplete={handleSpinComplete} />
        </div>
    )
}
