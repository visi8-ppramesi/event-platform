import { faker } from "@faker-js/faker"

export class Genres{
    static Id(){
        return faker.datatype.uuid()
    }

    static Name(){
        return faker.music.genre()
    }

    static ImageUrl(){
        return faker.image.image()
    }
}