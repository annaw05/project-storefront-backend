# Storefront Backend Project

Purpose: create an online storefront to showcase product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.

Task: building the API that will support this application

## Technology used (dependencies)

- Server: express and nodemon
- Testing: jasmine and supertest
- Database: postgres and db-migrate
- Managing env variables: dotenv
- Security and authorization: bcrypt and jsonwebtoken
- docker

## Instructions for setting up and running project

### 1. Setup
#### 1.1. Install packages 
```
 npm install
```
#### 1.2. Create .env file
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_dev
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER=storefront_user
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=secret_password
SALT_ROUNDS=10
TOKEN_SECRET=secret_token
```
#### 1.3. Create database in docker container
```
docker run -d -p 5432:5432 --name storefront_db -e POSTGRES_PASSWORD=password123  -e POSTGRES_DB=storefront_dev postgres
docker exec -it <container id> bash
psql -U postgres

CREATE DATABASE storefront_dev;
CREATE DATABASE storefront_test;
CREATE USER storefront_user WITH PASSWORD 'password123';
\c storefront_dev
GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO storefront_user;
\c storefront_test
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront_user;
```
<> fields to be added  

#### 1.4. Run migrations
```
db-migrate up
```
#### 1.5. Ports
- backend: 3000
- database: 5432
### 2. Scripts
start application: npm run start
test: npm run test
compile: npm run build

### 3. Endpoints
http://localhost:3000/
#### users
- /users [GET] -> index() [Token required]
- /users/:id [GET] -> show() [Token required]
- /users [POST] -> create()
- /users/authenticate [POST] -> authenticate()
#### products
- /products [GET] -> index()
- /products/:id [GET] -> show()
- /products [POST] -> create() [Token required]
- /products/:id [POST] -> delete() [Token required]
#### orders
- /orders [GET] -> index()
- /orders/:id [GET] -> show()
- /orders [POST] -> create() 
- /orders/close/:id [POST] -> closeOrderStatus()
- /orders/:id [POST] -> delete()
- /orders/add-product [POST] -> addProduct()
#### dahsboars queries
- /products-by-category/:category [GET]
- /top-5-products [GET]
- /orders-by-user/:user_id [GET]
- /completed-orders/:user_id [GET]