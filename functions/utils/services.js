export const getServices = function(services){
    const admin = require('firebase-admin');
    admin.initializeApp(functions.config().firebase);
    const ret = {}
    services.map((service) => {
        switch(service){
            case 'db':
                ret.db = admin.firestore()
                break;
            case 'storage':
                ret.storage = admin.storage()
                break;
            case 'auth':
                ret.auth = admin.auth()
                break;
            case 'FieldValue':
                ret.FieldValue = admin.firestore.FieldValue
        }
    })
    return ret
}