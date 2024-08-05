import { Utilities } from '../util/utilities'

export default async function passwordLogIn(email, password) {
    const response = await Utilities.config["supabaseClient"].auth.signInWithPassword(
        {
            email: email,
            password: password
        }
    )

    console.log(response)
    const { data, error } = await response
    localStorage.setItem('hushh_id', data.user.id)
    console.log(data.user.id)
    if (error) {
        return -1;
    }
    return 1;
}