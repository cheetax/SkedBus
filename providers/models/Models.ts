import { ReactNode } from 'react'

export interface ContextProviderProps {
    children: ReactNode
}

export type Func<T> = (t: T) => T | void