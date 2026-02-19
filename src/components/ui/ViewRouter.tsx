'use client'

import { CategoryLegend } from '@/components/ui/CategoryLegend'
import { FocusOverlay } from '@/components/ui/FocusOverlay'
import { HRView } from '@/components/ui/HRView'
import { InfoPanel } from '@/components/ui/InfoPanel'
import { MiniMap } from '@/components/ui/MiniMap'
import { OnboardingHint } from '@/components/ui/OnboardingHint'
import { SearchBar } from '@/components/ui/SearchBar'
import { TourButton } from '@/components/ui/TourButton'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

export function ViewRouter() {
  const activeView = usePortfolioStore((s) => s.activeView)

  if (activeView === 'hr') {
    return <HRView />
  }

  return (
    <>
      {/* Dark veil for focus mode — punched through by bloom on selected node */}
      <FocusOverlay />
      <SearchBar />
      <CategoryLegend />
      <MiniMap />
      <InfoPanel />
      {/* Orientation & discoverability helpers */}
      <OnboardingHint />
      <TourButton />
    </>
  )
}
