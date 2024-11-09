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
    const [spinSound] = useState(() => new Audio("/audio/spin-sound.mp3"))
    const [winSound] = useState(() => new Audio("/audio/spin-winner.mp3"))

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
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
        setDarkMode(prefersDarkMode)
    }, [spinSound, winSound])

    return (
        <div
            className={`min-h-screen ${
                darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
            } transition-colors duration-300`}
        >
            <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col min-h-screen max-w-7xl">
                <header className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 px-2 sm:px-4">
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                            Wheelify
                        </h1>
                        <p className="text-xs sm:text-sm opacity-75">
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

                    <div className="flex gap-2 sm:gap-4 items-center">
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className={`p-1 sm:p-2 rounded-full ${
                                darkMode
                                    ? "hover:bg-gray-700"
                                    : "hover:bg-gray-200"
                            } transition-colors`}
                            aria-label={
                                soundEnabled ? "Mute sound" : "Unmute sound"
                            }
                        >
                            {soundEnabled ? (
                                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                        </button>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-1 sm:p-2 rounded-full ${
                                darkMode
                                    ? "hover:bg-gray-700"
                                    : "hover:bg-gray-200"
                            } transition-colors`}
                            aria-label={
                                darkMode
                                    ? "Switch to light mode"
                                    : "Switch to dark mode"
                            }
                        >
                            {darkMode ? (
                                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                        </button>
                    </div>
                </header>

                <main className="flex-grow grid lg:grid-cols-2 gap-4 sm:gap-8">
                    <div className="flex flex-col items-center">
                        <form
                            onSubmit={handleAddName}
                            className="flex gap-2 w-full max-w-xs sm:max-w-md mb-4 sm:mb-8"
                        >
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Enter a name"
                                className={`flex-grow px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-lg border ${
                                    darkMode
                                        ? "bg-gray-800 border-gray-700 text-white"
                                        : "bg-white border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg
                hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap text-sm sm:text-base"
                            >
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> Add
                            </button>
                        </form>
                        <div className="relative flex flex-col items-center w-full max-w-xs sm:max-w-md sm:mb-8">
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
                                className={`absolute bottom-0 px-8 py-3 rounded-full text-lg font-semibold lg:ms-[-90px] ${
                                    spinning
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                } text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                            >
                                Spin the Wheel!
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 sm:space-y-8">
                        <div
                            className={`p-3 sm:p-6 rounded-xl ${
                                darkMode ? "bg-gray-800" : "bg-white"
                            } shadow-lg`}
                        >
                            <div className="flex justify-between items-center mb-2 sm:mb-4">
                                <h2 className="text-lg sm:text-xl font-semibold">
                                    Names on Wheel ({names.length})
                                </h2>
                                <button
                                    onClick={() => setNames([])}
                                    className="text-red-500 hover:text-red-600 transition-colors"
                                    disabled={names.length === 0}
                                    aria-label="Clear all names"
                                >
                                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                            <div className="space-y-1 sm:space-y-2 max-h-[150px] sm:max-h-[200px] overflow-y-auto">
                                {names.map((name, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-between items-center p-1 sm:p-2 rounded text-sm sm:text-base ${
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
                                                        (_, i) => i !== index
                                                    )
                                                )
                                            }
                                            className="text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
                                            aria-label={`Remove ${name}`}
                                        >
                                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className={`p-3 sm:p-6 rounded-xl ${
                                darkMode ? "bg-gray-800" : "bg-white"
                            } shadow-lg`}
                        >
                            <div className="flex justify-between items-center mb-2 sm:mb-4">
                                <h2 className="text-lg sm:text-xl font-semibold">
                                    Selected Names ({selectedNames.length})
                                </h2>
                                <button
                                    onClick={resetGame}
                                    className="text-blue-500 hover:text-blue-600 transition-colors"
                                    disabled={selectedNames.length === 0}
                                    aria-label="Reset game"
                                >
                                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                            <div className="space-y-1 sm:space-y-2 max-h-[150px] sm:max-h-[200px] overflow-y-auto">
                                {selectedNames.map((name, index) => (
                                    <div
                                        key={index}
                                        className={`p-1 sm:p-2 rounded text-sm sm:text-base ${
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
