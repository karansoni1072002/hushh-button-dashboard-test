import { Utilities } from '../util/utilities'

export default async function passwordSignUp(email, password) {
    const response = await Utilities.config["supabaseClient"].auth.signUp({
        email: email,
        password: password
    })

    console.log(response)
    const { error, data } = await response
    console.log(error)
    console.log(data)
    if (error) {
        return -1;
    }
    localStorage.setItem('hushh_id', data.user.id)
    return 1;
}

