import { faker } from "@faker-js/faker";
import _ from 'lodash'

const titleCase = (strArr) => {
    return _.startCase(_.toLower(strArr.join('_'))).split(' ').join('')
}
// import { Artists } from "./artists.js";

export class Events{
    static Id(){
        return faker.datatype.uuid()
    }

    static Name(){
        return faker.name.findName()
    }
    
    static Description(){
        return faker.lorem.sentences()
    }

    static StartDate(){
        return faker.date.recent()
    }

    static EndDate(){
        return faker.date.recent()
    }

    static Artists(){
        return [
            // Artists.id
        ]
    }

    static ArtistsData(){
        return [
            {
                // id: Artists.Id,
                // profile_picture: Artists.ProfilePicture,
                // name: Artists.Name
            }
        ]
    }

    static Location(){
        return faker.address.nearbyGPSCoordinate().join(', ')
    }

    static LocationData(){
        return faker.address.streetAddress()
    }

    static CoverPicture(){
        return faker.image.image()
    }

    static TicketLink(){
        return faker.internet.url()
    }

    static Subscribers(){
        return 0
    }

    static TicketTypes(){
        const length = Math.round(Math.random() * 4) + 1
        const ret = []
        for(let i = 0; i < length; i++){
            ret.push({
                name: titleCase([faker.hacker.ingverb(), faker.hacker.ingverb()]),
                price: Math.round(Math.random() * 4) + 1
            })
        }
        return ret
    }

    static Type(){
        return !!Math.round(Math.random()) ? 
            !!Math.round(Math.random()) ? 'online-only' : 'mixed' : 'live-only'
    }
}