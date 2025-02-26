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

export type BusesGeo = Buses & {
    lat: string
    lon: string
}

type Tables = Database['public']['Views']
export type Buses = Tables['BusesView']['Row']
export type BusInRoute = Tables['BusInRouteView']['Row']
export type BusStops = Tables['BusStopsView']['Row']
export type Routes = Tables['RoutesView']['Row']
export type BusStopsInRoute = Tables['BusStopsInRouteView']['Row']
export type Schedules = Tables['SchedulesInBusStopView']['Row']

export type BaseType = {
    Buses: Buses[];
    BusInRoute: BusInRoute[];
    BusStops: BusStops[];
    Routes: Routes[];
    BusStopsInRoute: BusStopsInRoute
    Schedules: Schedules[];
}

export class Base {
    Buses: Buses[] = [];
    BusInRoute: BusInRoute[] = [];
    BusStops: BusStops[] = [];
    Routes: Routes[] = [];
    BusStopsInRoute: BusStopsInRoute[] = []
    Schedules: Schedules[] = [];
}