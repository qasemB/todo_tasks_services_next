import { create } from 'zustand'

type State = {
  showMenu: boolean
}

type Action = {
  setShowMenu: (showMenu: State['showMenu']) => void
  toggleShowMenu: () => void
}

// Create your store, which includes both state and (optionally) actions
export const useShowMenuStore = create<State & Action>((set) => ({
  showMenu: false,
  setShowMenu: (showMenu) => set({showMenu}),
  toggleShowMenu: () => set(({showMenu})=>({showMenu: !showMenu})),
}))