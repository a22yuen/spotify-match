export const fetchUserData = async ( token: string) => {
    console.log("fetching user data with token", token)
    const response = await fetch('https://api.spotify.com/v1/me', 
    {headers: {
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
    }})

    const parsed = await response.json()
    console.log("response", parsed);
    return parsed;
}