'use client'

import { useMemo } from 'react'

import { usePortfolioStore } from '@/stores/usePortfolioStore'
import { THEMES } from '@/lib/themes'
import type { NetworkTheme } from '@/lib/themes'

export function useTheme(): NetworkTheme {
  const activeTheme = usePortfolioStore((s) => s.activeTheme)
  return useMemo(() => THEMES[activeTheme], [activeTheme])
}
