import React, { useState, useEffect } from "react"
import { WheelSpinner } from "./components/WheelSpinner"
import { ResultPopup } from "./components/ResultPopup"
import {
    Volume2,
    VolumeX,
    Moon,
    Sun,
    Trash2,
    Plus,
    RefreshCw,
} from "lucide-react"

const wheelColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEEAD",
    "#D4A5A5",
    "#9B5DE5",
    "#F15BB5",
    "#00BBF9",
    "#00F5D4",
    "#FEE440",
    "#9B5DE5",
]

function App() {
    const [names, setNames] = useState<string[]>([])
    const [selectedNames, setSelectedNames] = useState<string[]>([])
    const [newName, setNewName] = useState("")
    const [spinning, setSpinning] = useState(false)
    const [winner, setWinner] = useState<string | null>(null)
    const [darkMode, setDarkMode] = useState(false)
    const [soundEnabled, setSoundEnabled] = useState(true)
    const [spinSound] = useState(() => {
        const audio = new Audio("/audio/spin-sound.mp3")
        return audio
    })
    const [winSound] = useState(() => {
        const audio = new Audio("/audio/spin-winner.mp3")
        return audio
    })

    const playSound = async (audio: HTMLAudioElement) => {
        try {
            if (soundEnabled) {
                audio.currentTime = 0
                await audio.play()
            }
        } catch (error) {
            console.warn("Audio playback failed:", error)
        }
    }

    const handleAddName = (e: React.FormEvent) => {
        e.preventDefault()
        if (newName.trim() && !names.includes(newName.trim())) {
            setNames([...names, newName.trim()])
            setNewName("")
        }
    }

    const handleSpin = () => {
        if (names.length > 0 && !spinning) {
            setSpinning(true)
            playSound(spinSound)
        }
    }

    const handleSpinComplete = (winner: string) => {
        setSpinning(false)
        setWinner(winner)
        playSound(winSound)
    }

    const handleWinnerClose = () => {
        if (winner) {
            setNames(names.filter((name) => name !== winner))
            setSelectedNames([...selectedNames, winner])
            setWinner(null)
        }
    }

    const resetGame = () => {
        setNames([])
        setSelectedNames([])
        setWinner(null)
        setSpinning(false)
    }

    useEffect(() => {
        spinSound.load()
        winSound.load()
    }, [spinSound, winSound])

    useEffect(() => {
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
        setDarkMode(prefersDarkMode)
    }, [])

    return (
        <div
            className={`min-h-screen ${
                darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
            } transition-colors duration-300`}
        >
            <div className="container mx-auto px-4 py-6 md:py-8 flex flex-col min-h-screen max-w-7xl">
                <header className="flex justify-between items-center mb-6 md:mb-8 px-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2 pb-3">
                            Wheelify
                        </h1>
                        <p className="text-sm opacity-75 mb-4 mt-[-8px]">
                            Created with ♡ by:{" "}
                            <a
                                href="https://handikatriarlan.my.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-500 hover:text-purple-600 transition-colors"
                            >
                                handikatriarlan
                            </a>
                        </p>
                    </div>

                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className={`p-2 rounded-full ${
                                darkMode
                                    ? "hover:bg-gray-700"
                                    : "hover:bg-gray-200"
                            } transition-colors`}
                        >
                            {soundEnabled ? (
                                <Volume2 className="w-6 h-6" />
                            ) : (
                                <VolumeX className="w-6 h-6" />
                            )}
                        </button>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-2 rounded-full ${
                                darkMode
                                    ? "hover:bg-gray-700"
                                    : "hover:bg-gray-200"
                            } transition-colors`}
                        >
                            {darkMode ? (
                                <Sun className="w-6 h-6" />
                            ) : (
                                <Moon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </header>

                <main className="flex-grow">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center">
                            <form
                                onSubmit={handleAddName}
                                className="flex gap-2 w-full max-w-md mb-8"
                            >
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Enter a name"
                                    className={`flex-grow px-4 py-2 rounded-lg border ${
                                        darkMode
                                            ? "bg-gray-800 border-gray-700 text-white"
                                            : "bg-white border-gray-300"
                                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg
                    hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                                >
                                    <Plus className="w-5 h-5" /> Add
                                </button>
                            </form>

                            <div className="relative flex flex-col items-center">
                                <div className="w-full aspect-square">
                                    <WheelSpinner
                                        names={names}
                                        spinning={spinning}
                                        onSpinComplete={handleSpinComplete}
                                        darkMode={darkMode}
                                        wheelColors={wheelColors}
                                    />
                                </div>
                                <button
                                    onClick={handleSpin}
                                    disabled={spinning}
                                    className={`absolute bottom-0 px-8 py-3 rounded-full text-lg font-semibold ms-[-100px] ${
                                        spinning
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                    } text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                                >
                                    Spin the Wheel!
                                </button>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div
                                className={`p-6 rounded-xl ${
                                    darkMode ? "bg-gray-800" : "bg-white"
                                } shadow-lg`}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">
                                        Names on Wheel ({names.length})
                                    </h2>
                                    <button
                                        onClick={() => setNames([])}
                                        className="text-red-500 hover:text-red-600 transition-colors"
                                        disabled={names.length === 0}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                    {names.map((name, index) => (
                                        <div
                                            key={index}
                                            className={`flex justify-between items-center p-2 rounded ${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-gray-50"
                                            }`}
                                        >
                                            <span className="break-all pr-2">
                                                {name}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    setNames(
                                                        names.filter(
                                                            (_, i) =>
                                                                i !== index
                                                        )
                                                    )
                                                }
                                                className="text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div
                                className={`p-6 rounded-xl ${
                                    darkMode ? "bg-gray-800" : "bg-white"
                                } shadow-lg`}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">
                                        Selected Names ({selectedNames.length})
                                    </h2>
                                    <button
                                        onClick={resetGame}
                                        className="text-blue-500 hover:text-blue-600 transition-colors"
                                        disabled={selectedNames.length === 0}
                                    >
                                        <RefreshCw className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                    {selectedNames.map((name, index) => (
                                        <div
                                            key={index}
                                            className={`p-2 rounded ${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-gray-50"
                                            }`}
                                        >
                                            <span className="break-all">
                                                {name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <ResultPopup
                winner={winner}
                onClose={handleWinnerClose}
                darkMode={darkMode}
            />
        </div>
    )
}

export default App
