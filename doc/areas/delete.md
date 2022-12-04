# Remove an Area

Remove an area with its id.

**URL** : `/areas/:areaId`

**URL Parameters**: areaId=[string] id of an area.

**Method** : `DELETE`

**Auth required** : Yes `(JWT)`

**Parameters**: None

## Succes Response

**Code** : `200 OK`

## Failure Response

**Code** : `403 Can't find Object in database`

**Reason** : Tryng to find an area with an inexistant id in the database
