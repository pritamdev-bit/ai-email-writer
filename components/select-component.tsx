"use client"
import React, { useState } from "react"

export default function Selector({ options, selected, setSelected }: { options: string[], selected: string, setSelected: React.Dispatch<React.SetStateAction<string>> }) {
    
    const setOptions = () => {
        // @ts-ignore
        setSelected((prev) => {
            if (prev === options[0]) {
                return options[1]
            } else if (prev === options[1]) {
                return options[2]
            } else if (prev === options[2]) {
                return options[0]
            }
        })
    }
  return (
    <button
        onClick={() => setOptions()}
        className="bg-white inset-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)] rounded-lg border border-gray-300 hover:border-gray-400 transition-all duration-300 text-gray-800 font-medium text-sm px-4 py-2">
        {selected}
    </button>
  )
}
