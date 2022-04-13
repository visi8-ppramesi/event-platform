import { Artists } from "./artists.js";
import { Events } from "./events.js";
import { Genres } from "./genres.js";
import { Locations } from "./locations.js";
import { Users } from "./users.js";

export default { Artists, Events, Genres, Locations, Users }
// import { faker } from '@faker-js/faker'

// export class Name{
//     static getValue(){
//         return faker.name.findName()
//     }
// }

// export class Email{
//     static getValue(){
//         return faker.internet.email()
//     }
// }

// export class AvatarUrl{
//     static getValue(){
//         return faker.image.avatar()
//     }
// }

// export class ImageUrl{
//     static getValue(){
//         return faker.image.image()
//     }
// }

// export class Zero{
//     static getValue(){
//         return 0
//     }
// }

// export class Coordinate{
//     static getValue(){
//         return faker.address.nearbyGPSCoordinate().join(', ')
//     }
// }

// export class Bool{
//     static getValue(){
//         return !!Math.round(Math.random())
//     }
// }

// export class HackerPhrase{
//     static getValue(){
//         return faker.hacker.phrase()
//     }
// }

// export class Lorem{
//     static getValue(){
//         return faker.lorem.sentences()
//     }
// }