import { Utilities } from '../util/utilities'

export default async function logout() {
    const response = await Utilities.config["supabaseClient"].auth.signOut()
    const { error } = response
    console.log(error)
    if (error === null) {
        localStorage.removeItem('hushh_id')
        localStorage.removeItem('sb-rpmzykoxqnbozgdoqbpc-auth-token')
        return 1;
    }
    return -1;
}