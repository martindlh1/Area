# Show all Areas of a User

Get the details of all the areas currently created by the user.

**URL** : `/areas/:userId`

**URL Parameters**: userId=[string] id of the user.

**Method** : `GET`

**Auth required** : Yes `(JWT)`

**Parameters**: None

## Succes Response

**Code** : `200 OK`

**Returned data**

```
{
  id: string,
  name: string,
  on: boolean
}[]
```

## Failure Response

**Code** : `403 Can't find Object in database`

**Reason** : Tryng to find an area with an inexistant id in the database

# Show one Area

Get the details of one area created by the user.

**URL** : `/areas/:areaId`

**URL Parameters**: areaId=[string] id of an area.

**Method** : `GET`

**Auth required** : Yes `(JWT)`

**Parameters**: None

## Succes Response

**Code** : `200 OK`

**Returned data**

```
{
  id: string,
  name: string,
  interval: number,
  userId: string
  actions[]: {
    id: number
    serviceId: number
    param: string[]
  },
  reactions[]: {
    id: string
    serviceId: number
    param: string[]
  }
}
```

## Failure Response

**Code** : `403 Can't find Object in database`

**Reason** : Tryng to find an area with an inexistant id in the database
