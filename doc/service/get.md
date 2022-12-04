# Show available services.

Return all the available services.

**URL** : `/service`

**Method** : `GET`

**Auth required** : No

**Parameters**: None

## Succes Response

**Code** : `200 OK`

**Returned data**

```
{
  services[]: {
    id: number,
    title: string,
    name: string,
    logo: string,
    color: string,
    loged: boolean
  }
}
```

# Get Information about a service

**URL** : `/service/:service`

**URL Parameters**: service=[string] name of the service

**Method** : `GET`

**Auth required** : No

**Parameters**: None

## Succes Response

**Code** : `200 OK`

**Returned data**

```
{
  service: {
    id: number,
    title: string,
    name: string,
    logo: string,
    color: string,
    loged: boolean
  }
}
```

# Reaction Endpoints

## Get all reactions of a specific service.

**URL** : `/service/:service/reaction`

**URL Parameters**: service=[string] name of the service

**Method** : `GET`

**Auth required** : Yes `(JWT)`

**Parameters**: None

### Succes Response

**Code** : `200 OK`

**Returned data**

```
{
  reactions[]: {
    id: string,
    desc: string
  }
}
```

### Failure Response

**Code** : `400 Service does not exist`

**Reason** : Trying to find an inexistant service

## Get details about a specific reaction of a service

**URL** : `/service/:service/reaction/:reactionId`

**URL Parameters**: service=[string] name of the service
reactionId=[string] id of the reaction

**Method** : `GET`

**Auth required** : Yes `(JWT)`

**Parameters**: None

### Succes Response

**Code** : `200 OK`

**Returned data**

```
{
  serviceId: number,
  id: number,
  desc: string,
  paramSchem[]: {
    type: string,
    desc: string
  }
}
```

### Failure Response

**Code** : `400 Service does not exist`

**Reason** : Trying to find an inexistant service

# Action Endpoints

## Get all actions of a specific service.

**URL** : `/service/:service/action`

**URL Parameters**: service=[string] name of the service

**Method** : `GET`

**Auth required** : Yes `(JWT)`

**Parameters**: None

### Succes Response

**Code** : `200 OK`

**Returned data**

```
{
  actions[]: {
    id: string,
    desc: string
  }
}
```

### Failure Response

**Code** : `400 Service does not exist`

**Reason** : Trying to find an inexistant service

## Get details about a specific action of a service

**URL** : `/service/:service/action/:actionId`

**URL Parameters**: service=[string] name of the service
actionId=[string] id of the action

**Method** : `GET`

**Auth required** : Yes `(JWT)`

**Parameters**: None

### Succes Response

**Code** : `200 OK`

**Returned data**

```
{
  serviceId: number,
  id: number,
  desc: string,
  paramSchem[]: {
    type: string,
    desc: string
  }
}
```

### Failure Response

**Code** : `400 Service does not exist`

**Reason** : Trying to find an inexistant service

# Authenticate to a service

Authenticate to a specific service.

**URL** : `/service/:service/auth`

**URL Parameters**: service=[string] name of the service

**Method** : `GET`

**Auth required** : Yes `(JWT)`

**Parameters**: None

### Succes Response

**Code** : `200 OK`

### Failure Response

**Code** : `401 Already connected`

**Reason** : Trying to connect to a service which is already connected

# Logout from a service

Logout from a specific service.

**URL** : `/service/:service/logout`

**URL Parameters**: service=[string] name of the service

**Method** : `GET`

**Auth required** : Yes `(JWT)`

**Parameters**: None

### Succes Response

**Code** : `200 OK`

### Failure Response

**Code** : `400 Not connected to the service`

**Reason** : Trying to logout from a service which is not connected
