import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Token from '../token.env.json'

const supabaseKey = Token.supabase.key

export const Supabase = createClient(Token.supabase.url, supabaseKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });

 // console.log(Supabase)