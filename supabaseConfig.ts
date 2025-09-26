
import { createClient } from '@supabase/supabase-js'

// 1. Go to https://supabase.com/ and create a new project.
// 2. In your project, go to Project Settings (gear icon) -> API.
// 3. Find your Project URL and anon public key.
// 4. It's recommended to store these in environment variables.
//    Create a .env.local file in your root directory and add:
//    REACT_APP_SUPABASE_URL=YOUR_SUPABASE_URL
//    REACT_APP_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
// 5. Paste the values there. Or for quick testing, paste them directly here.

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
