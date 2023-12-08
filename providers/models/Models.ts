import { ReactNode } from 'react'
import { Database } from './Supabase'

export type Modify<T, R> = Omit<T, keyof R> & R;

export interface ContextProviderProps {
    children: ReactNode
}

export type Func<T extends object> = (props: T) => any

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
    profit: number, //доход
    profitPerOdometer: number, //доход на километр
    odometer: Odometer,     //Данные о пробеге
    expenses: number,     //затраты
    key: string,
    isUpdate: boolean
    id: string
}

export type Settings = {
    priceFuel: number,
    averageFuel: number
}

export type User = {
    name: string,
    email: string,
    avatar: string
}

type Tables = Database['public']['Tables']
export type WorkingShifts = Tables['workingShifts']['Row']
export type Odometers = Tables['odometers']['Row']
export type OdometerItems = Tables['odometerItems']['Row']


