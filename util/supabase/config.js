import { createClient } from '@supabase/supabase-js';

// tkkqwufsogvjcgwhcgci
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRra3F3dWZzb2d2amNnd2hjZ2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3OTE1OTIsImV4cCI6MjAyNTM2NzU5Mn0.z1FWn5rBmiIXmkN2eDq0zcpaB5GxyxGKIDJR_u8DnRg
// https://eaeokyefsdfamwqqzfko.supabase.co
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZW9reWVmc2RmYW13cXF6ZmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzNzExODYsImV4cCI6MjAyNDk0NzE4Nn0.iqWMB0debYgPRX5PjtJuIfy5ImxZfC9ol7A4EPFXmFU
const config = {
    "SUPABASE_URL": "https://rpmzykoxqnbozgdoqbpc.supabase.co",
    "SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbXp5a294cW5ib3pnZG9xYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5Mjc5NzEsImV4cCI6MjAxNzUwMzk3MX0.3GwG8YQKwZSWfGgTBEEA47YZAZ-Nr4HiirYPWiZtpZ0",
    "supabaseClient": null,
    // "vibesearchAPIEndpoint": " https://vibe-search-version3-yxfa6ba3aq-uc.a.run.app",
    // "guestModeAccessToken": "P2H8RNXPvIiPoeM0iJEDjJ2Skk37h5pScMQF5oMRUXm3dKoUC2wxrWImx5ccA9VOrOoeaLcMQqn57vYDPucTkYnkkH6icUQy09vtd5eIrAIXhBtmUfAmPI3thD2OoUeF"
}

function createSupabaseClient() {
    const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
    // console.log(await supabase.auth.getSession()
    return supabase
}

config["supabaseClient"] = createSupabaseClient()

export default config;