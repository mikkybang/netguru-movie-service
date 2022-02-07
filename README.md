# netguru-movie-service

## Prerequisites to run locally

You need to have `docker` and `docker-compose` installed on your computer to run the service

## Run locally

1. Clone this repository
1. Run from root dir

```
JWT_SECRET=secret docker-compose up -d
```

By default the movie service will start on port `5000` but you can override
the default value by setting the `APP_PORT` env var

```
APP_PORT=8081 JWT_SECRET=secret docker-compose up -d
```

To stop the movie service run

```
docker-compose down
```

## Authorization

The jwt token can be gotten by running the authentication service provided

## Example request

### Create a Movie Object

To create a movie object user call the movie service using for example `curl`.
and passing in the token gotten from the authentication service.

Request

```
curl --location --request POST '0.0.0.0:5000/movies' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>'\
--data-raw '{
    "title": "Beauty and the beast",
}'
```

Response

```
{
    "message": "Movie created successfully",
    "data": {
        "userId": 434,
        "title": "Beauty and the Beast",
        "released": "1991-11-21T23:00:00.000Z",
        "genre": "Animation, Family, Fantasy",
        "director": "Gary Trousdale, Kirk Wise",
        "_id": "62015d3409e5be6539832006",
        "__v": 0
    }
}
```

### Get a list of User's Movies

To get a list of user's movies user call the movie service using for example `curl`.
and passing in the token gotten from the authentication service.

Request

```
curl --location --request GET '0.0.0.0:5000/movies' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>'\
```

Response

```
{
     "message": "Movies",
    "data": [
        {
            "_id": "6201364154a6d6ada186dd03",
            "userId": 434,
            "title": "Ant-Man",
            "released": "2015-07-16T23:00:00.000Z",
            "genre": "Action, Adventure, Comedy",
            "director": "Peyton Reed",
            "__v": 0
        },
        {
            "_id": "62014310775514aaee3f198e",
            "userId": 434,
            "title": "Ant-Man",
            "released": "2015-07-16T23:00:00.000Z",
            "genre": "Action, Adventure, Comedy",
            "director": "Peyton Reed",
            "__v": 0
        },
        {
            "_id": "62014d28deedd2194f12631f",
            "userId": 434,
            "title": "Ant-Man",
            "released": "2015-07-16T23:00:00.000Z",
            "genre": "Action, Adventure, Comedy",
            "director": "Peyton Reed",
            "__v": 0
        },
        }
}
```
