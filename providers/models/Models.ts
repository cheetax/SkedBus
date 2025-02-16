import { ReactElement, ReactNode } from 'react'
import { Database } from './database.types'
import { ImageSourcePropType } from 'react-native';

export type Modify<T, R> = Omit<T, keyof R> & R;

export interface ContextProviderProps {
    children: ReactNode
}

export type Func<T extends object | string | boolean | number | undefined> = (props: T) => any

export type Settings = {
    priceFuel: number,
    averageFuel: number
}

export type SelectMarker = number | undefined;

export type MarkerType = {
    scale: number,
    //source:
    source: ReactElement
}

export type User = {}

type Tables = Database['public']['Tables']
export type Buses = Tables['Buses']['Row'] 
export type BusInRoute = Tables['BusInRoute']['Row']
export type BusStops = Tables['BusStops']['Row']
export type Routes = Tables['Routes']['Row']
export type Schedules = Tables['Schedules']['Row'] & { routeName: {name: string | null}, busStopName: {name: string | null}}

export type BaseType = {
    Buses: Buses[];
    BusInRoute: BusInRoute[];
    BusStops: BusStops[] ;
    Routes: Routes[] ;
    Schedules: Schedules[];
}

export class Base {
    Buses: Buses[] = [];
    BusInRoute: BusInRoute[] = [];
    BusStops: BusStops[] = [];
    Routes: Routes[] = [];
    Schedules: Schedules[] = [];
}