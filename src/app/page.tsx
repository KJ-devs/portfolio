import { SceneLoader } from '@/components/canvas/SceneLoader'
import { CategoryLegend } from '@/components/ui/CategoryLegend'
import { InfoPanel } from '@/components/ui/InfoPanel'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { MiniMap } from '@/components/ui/MiniMap'
import { Navbar } from '@/components/ui/Navbar'
import { SearchBar } from '@/components/ui/SearchBar'

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-neural-bg">
      <SceneLoader />
      <Navbar />
      <SearchBar />
      <CategoryLegend />
      <MiniMap />
      <InfoPanel />
      <LoadingScreen />
    </main>
  )
}
