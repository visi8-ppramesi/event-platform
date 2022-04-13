import types from './types/index.js'
import _ from 'lodash'

export default function(){
    const typesKey = Object.keys(types)
    const db = {}
    
    typesKey.map((typeKey) => {
        const fields = Object.getOwnPropertyNames(types[typeKey]).filter(v => {
            return !(v == 'prototype' || v == 'length' || v == 'name' || v == 'Id')
        })
    
        const len = Math.round(Math.random() * 6) + 1
        const data = []
        for(let i = 0; i < len; i++){
            const datum = fields.reduce((acc, field) => {
                acc[_.snakeCase(field)] = types[typeKey][field]()
                return acc
            }, {})
            data.push(datum)
        }
    
        db[_.snakeCase(typeKey)] = data
    })

    return db
}
