import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ResultPopupProps {
    winner: string | null
    onClose: () => void
    darkMode: boolean
}

export const ResultPopup: React.FC<ResultPopupProps> = ({
    winner,
    onClose,
    darkMode,
}) => {
    return (
        <AnimatePresence>
            {winner && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className={`${
                            darkMode ? "bg-gray-800" : "bg-white"
                        } p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 relative`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            🎉 Winner! 🎉
                        </h2>
                        <p
                            className={`text-3xl font-bold text-center ${
                                darkMode ? "text-purple-400" : "text-purple-600"
                            }`}
                        >
                            {winner}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
