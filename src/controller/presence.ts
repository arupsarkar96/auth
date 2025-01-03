import geoip from "geoip-lite"
import { presenceCreateService } from "../service/dbservice"


export const presenceController = async (username: string, ip: string) => {
    const geo = geoip.lookup(ip)
   if (geo) {
       const country: string | undefined = geo.country
       const region: string | undefined = geo.region
       const city: string | undefined = geo.city
       const lat = geo.ll[0]
       const lon = geo.ll[1]
       presenceCreateService(username, ip, city, region, country, lat, lon)
   }
}

geoip.reloadData(function () {
    console.log("Done");
});