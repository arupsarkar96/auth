import { getLocation } from "../service/location"
import { addPresenceService } from "../service/presence"



export const addPresenceController = async (uid: string, ip: string) => {
    const networkdata = await getLocation(ip)
    if (networkdata === null) {
        addPresenceService(uid, ip, null, null, null, null, null, null, null)
    } else {
        addPresenceService(uid, ip, networkdata.country, networkdata.countryCode, networkdata.regionName, networkdata.region, networkdata.city, networkdata.lat, networkdata.lon)
    }
}