'use client'

import { CategoryLegend } from '@/components/ui/CategoryLegend'
import { HRView } from '@/components/ui/HRView'
import { InfoPanel } from '@/components/ui/InfoPanel'
import { MiniMap } from '@/components/ui/MiniMap'
import { SearchBar } from '@/components/ui/SearchBar'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

export function ViewRouter() {
  const activeView = usePortfolioStore((s) => s.activeView)

  if (activeView === 'hr') {
    return <HRView />
  }

  return (
    <>
      <SearchBar />
      <CategoryLegend />
      <MiniMap />
      <InfoPanel />
    </>
  )
}
