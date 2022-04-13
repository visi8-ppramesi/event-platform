// import { Genres } from "./genres.js"
import { faker } from '@faker-js/faker'
import _ from 'lodash'

const titleCase = (strArr) => {
    return _.startCase(_.toLower(strArr.join('_'))).split(' ').join('')
}

export class Artists{
    static Id(){
        return faker.datatype.uuid()
    }

    static Name(){
        return faker.name.findName()
    }

    static About(){
        return faker.lorem.sentences()
    }

    static ProfilePicture(){
        return faker.image.avatar()
    }

    static Fans(){
        return 0
    }

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

    static ConcertPhotos(){
        const length = Math.round(Math.random() * 4) + 1
        const ret = []

        for(let i = 0; i < length; i++){
            ret.push(faker.image.image())
        }

        return ret
    }

    static Genres(){
        return []
    //     return [Genres.Name()]
    }

    static OnTour(){
        return !!Math.round(Math.random())
    }
}