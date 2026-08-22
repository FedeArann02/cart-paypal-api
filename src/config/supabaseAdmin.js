const { createClient } = require('@supabase/supabase-js') 

const supabaseUrl = process.env.SUPABASE_URL
const supabaseRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabaseAdmin = createClient(supabaseUrl, supabaseRoleKey)

module.exports = supabaseAdmin