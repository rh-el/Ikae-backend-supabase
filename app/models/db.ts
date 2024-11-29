import dotenv from 'dotenv'

// get .env config, stored natively in process.env
dotenv.config();


const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANONKEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase