# Create new Area

Create a new area.

**URL** : `/areas`

**URL Parameters**: userId=[string] id of the user.

**Method** : `POST`

**Auth required** : Yes `(JWT)`

**Parameters**

```
{
  name: string,
  interval: number,
  actions[]: {
    id: number
    serviceId: number
    param: string[]
  },
  reactions[]: {
    id: number
    serviceId: number
    param: string[]
  }
}
```

## Succes Response

**Code** : `200 OK`

## Failure Response

**Code** : `402 Error while saving Area on database`

**Reason** : Error occured while saving an item in the database
