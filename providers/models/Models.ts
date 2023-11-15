import { ReactNode } from 'react'

export interface ContextProviderProps {
    children: ReactNode
}

export type Func<T> = (t: T) => T | void

export type OdometerItem = {
    odometerStart: number  //спидометр старт
    odometerFinish: number //спидометр финиш
    key: string
}
export type Odometer = {
    resultOdometer: number
    data: OdometerItem[]
}

export type Item = {
    date: Date //dayjs().format('DD.MM.YY'),
    priceFuel: number,
    averageFuel: number,
    proceeds: number, //выручка
    profit: number , //доход
    profitPerOdometer: number | string, //доход на километр
    odometer: Odometer,     //Данные о пробеге
    expenses: number,     //затраты
    key: string
}

export type Settings = {
    priceFuel: number,
    averageFuel: number
}


