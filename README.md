# RESTAPI DOC

## App Endpoints
Login/Register Endpoints

- [Login](./doc/auth/post.md) : `POST /auth/login`
- [Register](./doc/auth/post.md) : `POST /auth/register`
- [Login with a service](./doc/auth/post.md) : `POST /auth/login/:service`
- [Register with a service](./doc/auth/post.md) : `POST /auth/register/:service`

## AREA Endpoints
Create/Manipulate Areas object.

- [Get one area](./doc/areas/get.md) : `GET /areas/:areaId`
- [Get all areas](./doc/areas/get.md) : `GET /areas`
- [Delete an area](./doc/areas/delete.md) : `DELETE /areas/:areaId`
- [Create new area](./doc/areas/post.md) : `POST /areas`
- [Modify area](./doc/areas/put.md): `PUT /areas/:areaId`

## Action/Reaction Endpoints
Get actions/reaction data.

- [Get information about a service](./doc/service/get.md) : `GET /service/:service`
- [Get all Actions of a service](./doc/service/get.md) : `GET /service/:service/action`
- [Get all Reaction of a service](./doc/service/get.md) : `GET /service/:service/reaction`
- [Get one specific action of a service](./doc/service/get.md) : `GET /service/:service/action/:actionId`
- [Get one specific reaction of a service](./doc/service/get.md) : `GET /service/:service/reaction/:reactionId`

## Service Endpoints

- [Get all services available](./doc/service/get.md): `GET /service`
- [Authenticate to a service](./doc/service/get.md): `GET /service/:service/auth`
- [Logout from a service](./doc/service/get.md): `GET /service/:service/logout`

## Admin Endpoints

- [Get all users](./doc/admin/get.md): `GET /admin/users`
- [Remove a user](./doc/admin/delete.md) `DELETE /admin/users/:userId`
