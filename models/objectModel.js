import { Realm, RealmProvider, useRealm, useQuery } from '@realm/react'

export class UPCS extends Realm.Object {
    static schema = {
        "title": "UPCS",
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "type": {
      "bsonType": "string"
    },
    "value": {
      "bsonType": "string"
    }
  },
  "required": [
    "_id"
  ]
    };
  }
  