import React from "react"

interface WheelSectionProps {
    name: string
    index: number
    total: number
    color: string
    radius: number
    center: number
    darkMode: boolean
}

export const WheelSection: React.FC<WheelSectionProps> = ({
    name,
    index,
    total,
    color,
    radius,
    center,
    darkMode,
}) => {
    const angle = (2 * Math.PI) / total
    const startAngle = index * angle
    const endAngle = (index + 1) * angle

    // Calculate path for the section
    const x1 = center + radius * Math.cos(startAngle)
    const y1 = center + radius * Math.sin(startAngle)
    const x2 = center + radius * Math.cos(endAngle)
    const y2 = center + radius * Math.sin(endAngle)

    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1"

    const path = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        "Z",
    ].join(" ")

    // Calculate text position and rotation
    const textAngle = startAngle + angle / 2
    const textRadius = radius * 0.75
    const textX = center + textRadius * Math.cos(textAngle)
    const textY = center + textRadius * Math.sin(textAngle)
    const rotation = (textAngle * 180) / Math.PI + 90

    return (
        <g className="wheel-section">
            <path
                d={path}
                fill={color}
                stroke={darkMode ? "#37415100" : "#E5E7EB00"}
                strokeWidth="1"
                className="transition-colors duration-300"
            />
            <text
                x={textX}
                y={textY}
                textAnchor="middle"
                transform={`rotate(${rotation} ${textX} ${textY})`}
                className={`text-sm font-medium ${
                    darkMode ? "fill-gray-900" : "fill-gray-900"
                }`}
                style={{ fontSize: "12px" }}
            >
                {name}
            </text>
        </g>
    )
}
