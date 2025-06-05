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
      chatroom_members: {
        Row: {
          id: number
          joinedAt: string | null
          room_id: number
          user_id: string | null
        }
        Insert: {
          id?: number
          joinedAt?: string | null
          room_id: number
          user_id?: string | null
        }
        Update: {
          id?: number
          joinedAt?: string | null
          room_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chatroom_members_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chatrooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatroom_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["uuid"]
          },
        ]
      }
      chatrooms: {
        Row: {
          created_at: string | null
          created_by: string | null
          event_id: number | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          event_id?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          event_id?: number | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chatrooms_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "chatrooms_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string | null
          created_at: string | null
          event_id: number
          id: number
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          event_id: number
          id?: number
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          event_id?: number
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["uuid"]
          },
        ]
      }
      event_participants: {
        Row: {
          event_id: number | null
          id: number
          joined_at: string | null
          user_id: string | null
        }
        Insert: {
          event_id?: number | null
          id?: number
          joined_at?: string | null
          user_id?: string | null
        }
        Update: {
          event_id?: number | null
          id?: number
          joined_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["uuid"]
          },
        ]
      }
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
          apply_due: string | null
          created_at: string
          custom_hashtag: string[] | null
          description: string | null
          destination: string | null
          end_time: string | null
          externalLink: string | null
          fee: number | null
          hashtag: number[] | null
          id: number
          img: string[] | null
          meeting_point: string | null
          name: string | null
          owner_id: string
          start_time: string | null
          type: number | null
        }
        Insert: {
          apply_due?: string | null
          created_at?: string
          custom_hashtag?: string[] | null
          description?: string | null
          destination?: string | null
          end_time?: string | null
          externalLink?: string | null
          fee?: number | null
          hashtag?: number[] | null
          id?: number
          img?: string[] | null
          meeting_point?: string | null
          name?: string | null
          owner_id: string
          start_time?: string | null
          type?: number | null
        }
        Update: {
          apply_due?: string | null
          created_at?: string
          custom_hashtag?: string[] | null
          description?: string | null
          destination?: string | null
          end_time?: string | null
          externalLink?: string | null
          fee?: number | null
          hashtag?: number[] | null
          id?: number
          img?: string[] | null
          meeting_point?: string | null
          name?: string | null
          owner_id?: string
          start_time?: string | null
          type?: number | null
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
      favorites: {
        Row: {
          event_id: number[] | null
          uuid: string
        }
        Insert: {
          event_id?: number[] | null
          uuid?: string
        }
        Update: {
          event_id?: number[] | null
          uuid?: string
        }
        Relationships: []
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
      members: {
        Row: {
          avatar: string | null
          bio: string | null
          created_at: string
          department: string | null
          email: string
          gender: number | null
          grad_time: string | null
          grade: number | null
          identity: number
          name: string
          phone: string | null
          point: number | null
          profileBackground: string | null
          studentId: string | null
          username: string | null
          uuid: string
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          department?: string | null
          email: string
          gender?: number | null
          grad_time?: string | null
          grade?: number | null
          identity?: number
          name: string
          phone?: string | null
          point?: number | null
          profileBackground?: string | null
          studentId?: string | null
          username?: string | null
          uuid?: string
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          department?: string | null
          email?: string
          gender?: number | null
          grad_time?: string | null
          grade?: number | null
          identity?: number
          name?: string
          phone?: string | null
          point?: number | null
          profileBackground?: string | null
          studentId?: string | null
          username?: string | null
          uuid?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string | null
          created_at: string
          id: number
          room_id: number | null
          sendAt: string | null
          sender_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          room_id?: number | null
          sendAt?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          room_id?: number | null
          sendAt?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chatrooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["uuid"]
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

