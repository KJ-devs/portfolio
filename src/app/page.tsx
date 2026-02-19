import { SceneLoader } from '@/components/canvas/SceneLoader'
import { InfoPanel } from '@/components/ui/InfoPanel'
import { SearchBar } from '@/components/ui/SearchBar'

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-neural-bg">
      <SceneLoader />
      <SearchBar />
      <InfoPanel />
    </main>
  )
}
