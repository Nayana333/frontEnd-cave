"use client"

import type React from "react"
import { useEffect, useState } from "react"

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours() % 12

  const secondDegrees = (seconds / 60) * 360
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360
  const hourDegrees = ((hours + minutes / 60) / 12) * 360

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="98" fill="#343b5d" stroke="#f4a261" strokeWidth="4" />

      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="10"
          x2="100"
          y2="20"
          transform={`rotate(${i * 30} 100 100)`}
          stroke="#f4a261"
          strokeWidth="2"
        />
      ))}

      <line
        x1="100"
        y1="100"
        x2="100"
        y2="50"
        transform={`rotate(${hourDegrees} 100 100)`}
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Minute hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="30"
        transform={`rotate(${minuteDegrees} 100 100)`}
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Second hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="20"
        transform={`rotate(${secondDegrees} 100 100)`}
        stroke="#f4a261"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Center dot */}
      <circle cx="100" cy="100" r="3" fill="#f4a261" />
    </svg>
  )
}

export default AnalogClock

