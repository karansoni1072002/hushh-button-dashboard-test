import { Utilities } from '../util/utilities'

export default async function googleSignIn() {
    // console.log("inside google signin")
    // https://vibesearch-vercel.vercel.app
    // http://localhost:3000
    const supabase = Utilities.config["supabaseClient"];
    await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'https://hushh-button.vercel.app/user/dashboard',
            queryParams: {
                access_type: 'offline',
                prompt: 'select_account',
            }
        }
    })
}