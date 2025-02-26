export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type ScheduleType = {time: string, daysWork: string}

type BusStopType = {busStopId: number, routeName: string}

export type Database = {
  public: {
    Tables: {
      Buses: {
        Row: {
          GUID: string | null
          id: number
          name: string | null
          stateNumber: string | null
        }
        Insert: {
          GUID?: string | null
          id?: number
          name?: string | null
          stateNumber?: string | null
        }
        Update: {
          GUID?: string | null
          id?: number
          name?: string | null
          stateNumber?: string | null
        }
        Relationships: []
      }
      BusInRoute: {
        Row: {
          bus: number | null
          id: number
          route: number | null
        }
        Insert: {
          bus?: number | null
          id?: number
          route?: number | null
        }
        Update: {
          bus?: number | null
          id?: number
          route?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "BusInRoute_bus_fkey"
            columns: ["bus"]
            isOneToOne: false
            referencedRelation: "Buses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BusInRoute_bus_fkey"
            columns: ["bus"]
            isOneToOne: false
            referencedRelation: "BusesView"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BusInRoute_route_fkey"
            columns: ["route"]
            isOneToOne: false
            referencedRelation: "Routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BusInRoute_route_fkey"
            columns: ["route"]
            isOneToOne: false
            referencedRelation: "RoutesView"
            referencedColumns: ["id"]
          },
        ]
      }
      BusStops: {
        Row: {
          id: number
          locPosition: string
          name: string | null
          side: number
        }
        Insert: {
          id?: number
          locPosition: string
          name?: string | null
          side?: number
        }
        Update: {
          id?: number
          locPosition?: string
          name?: string | null
          side?: number
        }
        Relationships: []
      }
      BusStopsInRoute: {
        Row: {
          busStop: number
          id: number
          routeId: number
        }
        Insert: {
          busStop: number
          id?: number
          routeId: number
        }
        Update: {
          busStop?: number
          id?: number
          routeId?: number
        }
        Relationships: [
          {
            foreignKeyName: "BusStopsInRoute_busStop_fkey"
            columns: ["busStop"]
            isOneToOne: false
            referencedRelation: "BusStops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BusStopsInRoute_busStop_fkey"
            columns: ["busStop"]
            isOneToOne: false
            referencedRelation: "BusStopsView"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BusStopsInRoute_routeId_fkey"
            columns: ["routeId"]
            isOneToOne: false
            referencedRelation: "Routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BusStopsInRoute_routeId_fkey"
            columns: ["routeId"]
            isOneToOne: false
            referencedRelation: "RoutesView"
            referencedColumns: ["id"]
          },
        ]
      }
      Routes: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      Schedules: {
        Row: {
          daysWork: string
          id: number
          idBusStopsInRoute: number | null
          time: string | null
        }
        Insert: {
          daysWork?: string
          id?: number
          idBusStopsInRoute?: number | null
          time?: string | null
        }
        Update: {
          daysWork?: string
          id?: number
          idBusStopsInRoute?: number | null
          time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Schedules_idBusStopsInRoute_fkey"
            columns: ["idBusStopsInRoute"]
            isOneToOne: false
            referencedRelation: "BusStopsInRoute"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Schedules_idBusStopsInRoute_fkey"
            columns: ["idBusStopsInRoute"]
            isOneToOne: false
            referencedRelation: "BusStopsInRouteView"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      BusesView: {
        Row: {
          GUID: string | null
          id: number | null
          name: string | null
          stateNumber: string | null
        }
        Insert: {
          GUID?: string | null
          id?: number | null
          name?: string | null
          stateNumber?: string | null
        }
        Update: {
          GUID?: string | null
          id?: number | null
          name?: string | null
          stateNumber?: string | null
        }
        Relationships: []
      }
      BusInRouteView: {
        Row: {
          bus: number | null
          id: number | null
          route: number | null
        }
        Insert: {
          bus?: number | null
          id?: number | null
          route?: number | null
        }
        Update: {
          bus?: number | null
          id?: number | null
          route?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "BusInRoute_bus_fkey"
            columns: ["bus"]
            isOneToOne: false
            referencedRelation: "Buses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BusInRoute_bus_fkey"
            columns: ["bus"]
            isOneToOne: false
            referencedRelation: "BusesView"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BusInRoute_route_fkey"
            columns: ["route"]
            isOneToOne: false
            referencedRelation: "Routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BusInRoute_route_fkey"
            columns: ["route"]
            isOneToOne: false
            referencedRelation: "RoutesView"
            referencedColumns: ["id"]
          },
        ]
      }
      BusStopsInRouteView: {
        Row: {
          busStop: number | null
          id: number | null
          routeName: string | null
          schedules: ScheduleType[]
        }
        Insert: {
          busStop?: number | null
          id?: number | null
          routeName?: never
          schedules?: never
        }
        Update: {
          busStop?: number | null
          id?: number | null
          routeName?: never
          schedules?: never
        }
        Relationships: [
          {
            foreignKeyName: "BusStopsInRoute_busStop_fkey"
            columns: ["busStop"]
            isOneToOne: false
            referencedRelation: "BusStops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BusStopsInRoute_busStop_fkey"
            columns: ["busStop"]
            isOneToOne: false
            referencedRelation: "BusStopsView"
            referencedColumns: ["id"]
          },
        ]
      }
      BusStopsView: {
        Row: {
          id: number 
          locPosition: string | null
          name: string | null
          side: number | null
        }
        Insert: {
          id?: number | null
          locPosition?: string | null
          name?: string | null
          side?: number | null
        }
        Update: {
          id?: number | null
          locPosition?: string | null
          name?: string | null
          side?: number | null
        }
        Relationships: []
      }
      RoutesView: {
        Row: {
          id: number | null
          name: string | null
        }
        Insert: {
          id?: number | null
          name?: string | null
        }
        Update: {
          id?: number | null
          name?: string | null
        }
        Relationships: []
      }
      SchedulesInBusStopView: {
        Row: {
          BusStop: BusStopType
          daysWork: string
          time: string
        }
        Insert: {
          BusStop?: never
          daysWork?: string | null
          time?: string | null
        }
        Update: {
          BusStop?: never
          daysWork?: string | null
          time?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      Base: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
