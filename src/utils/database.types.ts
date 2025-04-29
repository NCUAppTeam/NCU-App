export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
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
  public: {
    Tables: {
      event_type: {
        Row: {
          hashtag_relation: number[]
          type_id: number
          type_name: string
        }
        Insert: {
          hashtag_relation?: number[]
          type_id?: number
          type_name: string
        }
        Update: {
          hashtag_relation?: number[]
          type_id?: number
          type_name?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_time: string | null
          fee: number | null
          id: number
          location: string | null
          name: string | null
          start_time: string | null
          type: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_time?: string | null
          fee?: number | null
          id?: number
          location?: string | null
          name?: string | null
          start_time?: string | null
          type?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_time?: string | null
          fee?: number | null
          id?: number
          location?: string | null
          name?: string | null
          start_time?: string | null
          type?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "event_type"
            referencedColumns: ["type_id"]
          },
        ]
      }
      food_category: {
        Row: {
          food_category: string
          id: number
        }
        Insert: {
          food_category: string
          id?: number
        }
        Update: {
          food_category?: string
          id?: number
        }
        Relationships: []
      }
      identities: {
        Row: {
          identity_name: string
          identity_no: number
        }
        Insert: {
          identity_name?: string
          identity_no?: number
        }
        Update: {
          identity_name?: string
          identity_no?: number
        }
        Relationships: []
      }
      members: {
        Row: {
          avatar: string
          created_at: string
          fk_email: string
          fk_identity: number
          grad_time: string | null
          name: string
          uuid: string
        }
        Insert: {
          avatar?: string
          created_at?: string
          fk_email?: string
          fk_identity?: number
          grad_time?: string | null
          name: string
          uuid?: string
        }
        Update: {
          avatar?: string
          created_at?: string
          fk_email?: string
          fk_identity?: number
          grad_time?: string | null
          name?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_fk_identity_fkey"
            columns: ["fk_identity"]
            isOneToOne: false
            referencedRelation: "identities"
            referencedColumns: ["identity_no"]
          },
        ]
      }
      registrations: {
        Row: {
          event_id: number[] | null
          uuid: string
        }
        Insert: {
          event_id?: number[] | null
          uuid: string
        }
        Update: {
          event_id?: number[] | null
          uuid?: string
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          address: string | null
          fk_category: number
          id: number
          image: string | null
          location: number | null
          menu: string | null
          openday: number[] | null
          openhr: string
          restaurant: string | null
        }
        Insert: {
          address?: string | null
          fk_category: number
          id?: number
          image?: string | null
          location?: number | null
          menu?: string | null
          openday?: number[] | null
          openhr: string
          restaurant?: string | null
        }
        Update: {
          address?: string | null
          fk_category?: number
          id?: number
          image?: string | null
          location?: number | null
          menu?: string | null
          openday?: number[] | null
          openhr?: string
          restaurant?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_fk_category_fkey"
            columns: ["fk_category"]
            isOneToOne: false
            referencedRelation: "food_category"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          created_at: string
          id: number
          image: string | null
          price: number | null
          product: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image?: string | null
          price?: number | null
          product?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image?: string | null
          price?: number | null
          product?: string | null
          user_id?: string | null
        }
        Relationships: []
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

