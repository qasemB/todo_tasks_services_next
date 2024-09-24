import { create } from 'zustand'

export type ThemeType = "dark" | "light"

type State = {
    theme: ThemeType
}

type Action = {
    setTheme: (theme: State['theme']) => void
    toggleTheme: () => void
}

// Create your store, which includes both state and (optionally) actions
export const useThemeStore = create<State & Action>((set) => ({
    theme: "light",
    setTheme: (theme) => set({ theme }),
    toggleTheme: () => set(({ theme }) => ({ theme: theme === "dark" ? "light" : "dark" })),
}))