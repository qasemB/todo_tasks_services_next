import { useEffect, useRef } from "react"

export const useDidUpdateEffect = (effect: React.EffectCallback, deps?: React.DependencyList) => {
    const firstRender = useRef(true)
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        effect()
    }, deps)
}