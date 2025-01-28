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
          odometerFinish: number
          odometerId: string
          odometerStart: number
        }
        Insert: {
          created_at?: string
          id?: string
          odometerFinish: number
          odometerId: string
          odometerStart: number
        }
        Update: {
          created_at?: string
          id?: string
          odometerFinish?: number
          odometerId?: string
          odometerStart?: number
        }
        Relationships: [
          {
            foreignKeyName: "odometerItems_odometerId_fkey"
            columns: ["odometerId"]
            isOneToOne: false
            referencedRelation: "odometers"
            referencedColumns: ["id"]
          }
        ]
      }
      odometers: {
        Row: {
          created_at: string
          id: string
          resultOdometer: number
          shiftId: string
        }
        Insert: {
          created_at?: string
          id?: string
          resultOdometer: number
          shiftId: string
        }
        Update: {
          created_at?: string
          id?: string
          resultOdometer?: number
          shiftId?: string
        }
        Relationships: [
          {
            foreignKeyName: "odometers_shiftId_fkey"
            columns: ["shiftId"]
            isOneToOne: false
            referencedRelation: "workingShifts"
            referencedColumns: ["id"]
          }
        ]
      }
      workingShifts: {
        Row: {
          averageFuel: number
          created_at?: string
          date: string
          expenses: number
          id?: string
          key: string
          priceFuel: number
          proceeds: number
          profit: number
          profitPerOdometer: number
          userID?: string
        }
        Insert: {
          averageFuel: number
          created_at?: string
          date: string
          expenses: number
          id?: string
          key: string
          priceFuel: number
          proceeds: number
          profit: number
          profitPerOdometer: number
          userId?: string
        }
        Update: {
          averageFuel?: number
          created_at?: string
          date?: string
          expenses?: number
          id?: string
          key?: string
          priceFuel?: number
          proceeds?: number
          profit?: number
          profitPerOdometer?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "workingShifts_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
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
