export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      odometerItems: {
        Row: {
          created_at: string
          id: string
          odometerFinish: number | null
          odometerStart: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          odometerFinish?: number | null
          odometerStart?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          odometerFinish?: number | null
          odometerStart?: number | null
        }
        Relationships: []
      }
      odometers: {
        Row: {
          created_at: string
          id: string
          odometers: string | null
          resultOdometer: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          odometers?: string | null
          resultOdometer?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          odometers?: string | null
          resultOdometer?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "odometers_odometers_fkey"
            columns: ["odometers"]
            isOneToOne: false
            referencedRelation: "odometerItems"
            referencedColumns: ["id"]
          }
        ]
      }
      workingShifts: {
        Row: {
          averageFuel: number 
          //created_at: string
          date: string 
          expenses: number 
          //id: string
          key: string 
          odometer: string 
          priceFuel: number 
          proceeds: number 
          profit: number 
          profitPerOdometer: number | string
        }
        Insert: {
          averageFuel?: number | null
          created_at?: string
          date?: string | null
          expenses?: number | null
          id?: string
          key?: string | null
          odometer?: string | null
          priceFuel?: number | null
          proceeds?: number | null
          profit?: number | null
          profitPerOdometer?: number | null
        }
        Update: {
          averageFuel?: number | null
          created_at?: string
          date?: string | null
          expenses?: number | null
          id?: string
          key?: string | null
          odometer?: string | null
          priceFuel?: number | null
          proceeds?: number | null
          profit?: number | null
          profitPerOdometer?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workingShifts_odometer_fkey"
            columns: ["odometer"]
            isOneToOne: false
            referencedRelation: "odometers"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
