import { faker } from '@faker-js/faker'
import { Artists } from './artists.js'
import { Events } from './events.js'
import _ from 'lodash'

const titleCase = (strArr) => {
    return _.startCase(_.toLower(strArr.join('_'))).split(' ').join('')
}

export class Users{
    static Id(){
        return faker.datatype.uuid()
    }

    static Name(){
        return faker.name.findName()
    }

    static Email(){
        return faker.internet.email()
    }

    static ProfilePicture(){
        return faker.image.avatar()
    }

    static DefaultLocation(){
        return faker.address.nearbyGPSCoordinate().join(', ')
    }

    static Following(){
        return []
    }

    // static RefFollowing(){
    //     return [
    //         {id: Artists.id, parent_type: Artists, data: {profile_picture: Artists.ProfilePicture, name: Artists.Name}}, 
    //         {id: Events.id, parent_type: Events, data: {cover_picture: Events.ConverPicture, name: Events.Name, location: Events.Location}}
    //     ]
    // }

    static SocialLinks(){
        const length = Math.round(Math.random() * 4) + 1
        const ret = []
        for(let i = 0; i < length; i++){
            ret.push({
                name: titleCase([faker.hacker.ingverb(), faker.hacker.ingverb()]),
                url: faker.internet.url()
            })
        }
        return ret
    }
}