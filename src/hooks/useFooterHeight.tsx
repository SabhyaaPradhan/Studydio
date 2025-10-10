'use client'
import { useEffect, useRef } from 'react'

export function useFooterHeight(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const setVar = () => {
      const h = el.offsetHeight
      document.documentElement.style.setProperty('--footer-height', `${h}px`)
    }
    setVar()
    window.addEventListener('resize', setVar)
    const mo = new MutationObserver(setVar)
    mo.observe(el, { childList: true, subtree: true, characterData: true })
    return () => {
      window.removeEventListener('resize', setVar)
      mo.disconnect()
    }
  }, [ref])
}
