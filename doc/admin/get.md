# Get all users.

**URL** : `/admin/users`

**Method** : `GET`

**Auth required** : `JWT (admin account)`

**Parameters**: None

## Succes Response

**Code** : `200 OK`

**Returned data**

```
{
  id: string,
  username: string,
  password: string,
  services: {
    id: number,
    token: string,
    refreshToken: string
  }[]
}[]
```
