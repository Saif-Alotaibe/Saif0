# Saif0 Backend

## Getting Started

### Installing Dependencies

#### Python 3.7

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)


#### PIP Dependencies

install dependencies by naviging to the `/backend/src` directory and running:

```bash
pip install -r requirements.txt
```

This will install all of the required packages we selected within the `requirements.txt` file.

##### Key Dependencies

- [Flask](http://flask.pocoo.org/)  is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) and [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) are libraries to handle the lightweight sqlite database.

- [jose](https://python-jose.readthedocs.io/en/latest/) JavaScript Object Signing and Encryption for JWTs. Useful for encoding, decoding, and verifying JWTS.

## Running the server

From within the `./src` directory 

```bash
python app.py;
```
## Endpoints 
[View the Endpoints in details here .](./Saif0_Endpoints.md)


### Setup Auth0

1. Create a new Auth0 Account
2. Select a unique tenant domain
3. Create a new, single page web application
4. Create a new API
    - in API Settings:
        - Enable RBAC
        - Enable Add Permissions in the Access Token
5. Create new API permissions:
    - `get:actors`
    - `get:movies`
    - `post:actor`
    - `post:movie`
    - `patch:actor`
    - `patch:movie`
    - `delete:actor`
    - `delete:movie`
6. Create new roles for:
    - Casting Assistant
        - can `get:actors`
        - can `get:movies`
    - Casting Director
        - can perform all actions that Casting Assisstant can do
        - can `post:actor`
        - can `patch:actor`
        - can `patch:movie`
        - can `delete:actor`
    - Executive Producer
        - can perform all actions that Casting Director can do
        - can `post:movie`
        - can `delete:movie`     

## Testing Endpoints locally

before testing , inside `src` directory run the following command to export all env variables and tokens
```bash
. setup.sh

```

to test endpoints locally you can run the following commands inside `src` directory:

```bash
createdb Casting_Agency_Test
psql Casting_Agency_Test < database/Casting_Agency_test.sql 
```

change `User` variable inside test_app.py to yours then run the followin command:

```bash
python test_app.py
```

## Testing Endpoints of hosted api

api is hosted via heroku `https://saif0.herokuapp.com/`

to test hosted api you can run postman collection `src/capstone-project-casting_agency.postman_collection.json`
Note: tokens inside collection will remain active for 2 days

