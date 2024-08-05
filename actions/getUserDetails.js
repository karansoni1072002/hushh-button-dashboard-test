import { Utilities } from '../util/utilities'

export default async function getUserDetails(UID) {
    const userData = {};
    const supabase = Utilities.config["supabaseClient"];
    try {
        // Fetch user details
        const { data: userDetails, error: userDetailsError } = await supabase
            .from('users')
            .select()
            .eq('hushh_id', UID);
        if (userDetailsError) {
            console.error('Error fetching user details:', userDetailsError);
            userData.userDetails = [];
        } else {
            userData.userDetails = userDetails;
        }

        // Fetch user cookies data
        const { data: cookiesData, error: cookiesError } = await supabase
            .from('cookies')
            .select()
            .eq('hushh_id', UID);
        if (cookiesError) {
            console.error('Error fetching user cookies:', cookiesError);
            userData.cookies = [];
        } else {
            userData.cookies = cookiesData;
        }

        // Fetch user preference card
        const { data: preferenceCardData, error: preferenceCardError } = await supabase
            .from('brand_preferences')
            .select()
            .eq('hushh_id', UID);
        if (preferenceCardError) {
            console.error('Error fetching preference card:', preferenceCardError);
            userData.preferenceCard = [];
        } else {
            userData.preferenceCard = preferenceCardData;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data');
    }
    console.log(userData)
    return userData;
}