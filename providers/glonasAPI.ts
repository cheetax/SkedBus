import API from '../token.env.json'

const geoAPI = new XMLHttpRequest();

//console.log(geoAPI)

export const GeoAPIlogin = () => {

    //console.log(API.glonasAPI.ulr + 'auth/login')
    

    geoAPI.open('POST', API.glonasAPI.ulr + 'auth/login')

    geoAPI.setRequestHeader('Content-Type', 'application/json')
    geoAPI.setRequestHeader('Accept', 'application/json')

    const login = API.glonasAPI.login
    const password = API.glonasAPI.password

    console.log({login, password})
    geoAPI.send(JSON.stringify({login, password}))
    //geoAPI.send()

    geoAPI.onload = () => {
        if (geoAPI.status == 200) return JSON.parse(geoAPI.response)
        //console.log(geoAPI.status)
    }
}