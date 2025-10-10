'use client'
import { useRef } from 'react'
import { useFooterHeight } from '@/hooks/useFooterHeight'

export default function Footer() {
  const ref = useRef<HTMLElement | null>(null)
  useFooterHeight(ref)

  return (
    <footer
      ref={ref}
      className="fixed bottom-0 left-0 w-full z-50 pointer-events-auto bg-black/80 backdrop-blur-sm text-white"
      role="contentinfo"
      aria-label="Site footer"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold">©</span>
          <span className="text-sm">2024 Siloir. All rights reserved.</span>
        </div>

        <div className="font-extrabold text-lg">Siloir</div>
      </div>
    </footer>
  )
}
