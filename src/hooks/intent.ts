import { useSyncExternalStore } from 'react'
import type { IntentId } from '../content/content'

// Tiny shared store: a Services button picks the reason for contact, Connect shows it pre-selected.
let current: IntentId = 'consulting'
const listeners = new Set<() => void>()

export function setIntent(id: IntentId) {
  current = id
  listeners.forEach((l) => l())
}

export function useIntent() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => current,
  )
}
