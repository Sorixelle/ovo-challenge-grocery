ovo-challenge-grocery
=====================

Running
-------
Requirements:
- Docker
- docker-compose

``` sh
docker-compose -up
```

Access the app at http://localhost/

Development
-----------
Startup backend:

``` sh
cd backend
yarn
yarn dev
```

Startup frontend:

``` sh
cd frontend
cat "API_URL=<backend_url>" > .env
yarn
yarn dev
```
