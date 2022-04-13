import { faker } from "@faker-js/faker"

export class Locations{
    static Id(){
        return faker.datatype.uuid()
    }

    static Name(){
        return faker.company.companyName()
    }

    static Address(){
        return faker.address.nearbyGPSCoordinate().join(', ')
    }

    static Coordinates(){
        return faker.address.nearbyGPSCoordinate()
    }

    static CoverPicture(){
        return faker.image.image()
    }
}