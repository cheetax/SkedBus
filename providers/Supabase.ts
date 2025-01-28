import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlYWh6aHlraGlic2d4YW1kd3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExNzQ1OTEsImV4cCI6MjAxNjc1MDU5MX0.OQbSLZtRbGNDxv45EIMS0dWnZdZPbkTF34p9FkRipco"
export const supabase = createClient("https://peahzhykhibsgxamdwyk.supabase.co", supabaseKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });