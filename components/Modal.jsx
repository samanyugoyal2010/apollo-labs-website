'use client'

import { useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Accessible dialog: scroll lock without layout shift, Escape to close,
 * Tab cycles inside the panel, and focus returns to the trigger on close.
 */
export default function Modal({
  open,
  onClose,
  labelledBy,
  label,
  className = '',
  children,
}) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const trigger = document.activeElement
    const body = document.body
    const prevOverflow = body.style.overflow
    const prevPaddingRight = body.style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return

      const items = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetWidth > 0 || el.offsetHeight > 0
      )
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const raf = requestAnimationFrame(() => {
      const target = panel?.querySelector(FOCUSABLE) ?? panel
      target?.focus()
    })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPaddingRight
      if (trigger instanceof HTMLElement) trigger.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="apollo-modal-backdrop" onClick={onClose} role="presentation">
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`apollo-modal ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-label={labelledBy ? undefined : label}
      >
        <button
          type="button"
          className="apollo-modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <span aria-hidden>×</span>
        </button>
        {children}
      </div>
    </div>
  )
}
