# Login to the application

Used to collect a token for a registered User.

**URL** : `/login`

**Method** : `POST`

**Auth required** : No

**Parameters**

```
{
    username: string,
    password: string
}
```

## Succes Response

**Code** : `200 OK`

**Data returned**

```
{
    token: string
}
```

## Error Response

**Conditions** : If 'username' and 'password' combinaison is wrong.

**Code** : `400 BAD REQUEST`

# Register to the application

Create a new User account on the application database.

**URL** : `/register`

**Method** : `POST`

**Auth required** : No

**Parameters**

```
{
    username: string,
    password: string
}
```

## Succes Response

**Code** : `200 OK`

# Login to the application with a service

Used to collect a token for a registered User.

**URL** : `/login/:service`

**URL Parameters**: service=[string] name of the service

**Method** : `POST`

**Auth required** : No

## Succes Response

**Code** : `200 OK`

**Data returned**

```
{
    token: string
}
```

## Error Response

**Conditions** : If no user matchs with the service account.

**Code** : `400 BAD REQUEST`

# Register to the application with a service

Create a new User account on the application database.

**URL** : `/register/:service`

**URL Parameters**: service=[string] name of the service

**Method** : `POST`

**Auth required** : No

## Succes Response

**Code** : `200 OK`

## Error Response

**Conditions** : If a user already exists with the service account.

**Code** : `400 BAD REQUEST`
