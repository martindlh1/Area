# Modify Area

Change interval checking of an area

**URL** : `/areas/:areaId`

**URL Parameters**: areaId=[string] id of an area.

**Method** : `POST`

**Auth required** : Yes `(JWT)`

**Parameters**

```
{
    name: string ?,
    interval: number ?,
    on: boolean ?,
}
```

## Succes Response

**Code** : `200 OK`

## Failure Response

**Code** : `402 Error while saving Area on database`

**Reason** : Error occured while saving the changes in the database

## Failure Response

**Code** : `403 Can't find Object in database`

**Reason** : Tryng to find an area with an inexistant id in the database
