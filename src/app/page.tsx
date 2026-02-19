import { SceneLoader } from '@/components/canvas/SceneLoader'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { Navbar } from '@/components/ui/Navbar'
import { ViewRouter } from '@/components/ui/ViewRouter'

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-neural-bg">
      {/* 3D scene always rendered in background */}
      <SceneLoader />
      {/* Navbar always visible — contains view switcher */}
      <Navbar />
      {/* Loading screen only shown during neural intro */}
      <LoadingScreen />
      {/* Conditional: HR overlay or Neural UI controls */}
      <ViewRouter />
    </main>
  )
}
