# Delete a user.

**URL** : `/admin/users/:userId`

**Method** : `GET`

**URL Parameters**: userId=[string] id of the user to delete

**Auth required** : `JWT (admin account)`

**Parameters**: None

## Succes Response

**Code** : `200 OK`

### Failure Response

**Code** : `400 User does not exist`
