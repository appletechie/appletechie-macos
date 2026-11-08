"use client"

import { useState, useEffect } from "react"
import { SystemProvider, useSystem } from "@/components/system-provider"
import BootScreen from "@/components/boot-screen"
import LoginScreen from "@/components/login-screen"
import { lazy, Suspense } from "react"
import Portfolio from "@/components/portfolio"
const Desktop = lazy(() => import("@/components/desktop"))
import SleepScreen from "@/components/sleep-screen"
import ShutdownScreen from "@/components/shutdown-screen"

type SystemState = "booting" | "login" | "desktop" | "sleeping" | "shutdown" | "restarting"

function Shell() {
  const { brightness, isDarkMode, toggleDarkMode } = useSystem()
  const [systemState, setSystemState] = useState<SystemState>("desktop")
  const [exploring, setExploring] = useState(false)

  useEffect(() => {
    if (systemState === "booting" || systemState === "restarting") {
      const timer = setTimeout(() => setSystemState("login"), 3000)
      return () => clearTimeout(timer)
    }
  }, [systemState])

  const renderScreen = () => {
    switch (systemState) {
      case "booting":
      case "restarting":
        return <BootScreen />
      case "login":
        return (
          <LoginScreen
            onLogin={() => setSystemState("desktop")}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )
      case "desktop":
        return exploring ? (
          <Suspense fallback={<p role="status">Opening desktop…</p>}><button className="fixed top-10 right-4 z-[9998] rounded bg-white px-4 py-3 text-sm text-slate-900 shadow" onClick={() => setExploring(false)}>Back to portfolio</button><Desktop
            onLogout={() => setSystemState("login")}
            onSleep={() => setSystemState("sleeping")}
            onShutdown={() => setSystemState("shutdown")}
            onRestart={() => setSystemState("restarting")}
          /></Suspense>
        ) : <Portfolio onExplore={() => setExploring(true)} />
      case "sleeping":
        return <SleepScreen onWakeUp={() => setSystemState("login")} isDarkMode={isDarkMode} />
      case "shutdown":
        return <ShutdownScreen onBoot={() => setSystemState("booting")} />
      default:
        return <BootScreen />
    }
  }

  // brightness: 100% => no dim, 10% => ~0.81 dim
  const dim = Math.max(0, ((100 - brightness) / 100) * 0.9)

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {renderScreen()}
      <div
        className="pointer-events-none fixed inset-0 z-[9999] bg-black transition-opacity duration-300"
        style={{ opacity: dim }}
        aria-hidden
      />
    </div>
  )
}

export default function Home() {
  return (
    <SystemProvider>
      <Shell />
    </SystemProvider>
  )
}
