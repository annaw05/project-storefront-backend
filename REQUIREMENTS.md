# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index route: '/products' [GET]
- Show route: '/products/:id' [GET]
- Create [token required]: '/products' [POST]
- [OPTIONAL] Top 5 most popular products:  '/top-5-products' [GET]
- [OPTIONAL] Products by category (args: product category): '/products/:category' [GET]

#### Users
- Index [token required]: '/users' [GET]
- Show [token required]: 'users/:id' [GET]
- Create N[token required]: '/users' [POST]

#### Orders
- Current Order by user (args: user id)[token required]: '/order-by-user/:user-id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: '/completed-orders/:user-id' [GET]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category
Table: 
    products(id: SERIAL PRIMARY KEY, productName: VARCHAR(100), price: integer, productCategory: VARCHAR(50))

#### User
- id
- firstName
- lastName
- password
Table: 
    users(id: SERIAL PRIMARY KEY, firstName: VARCHAR(100), lastName: VARCHAR(100), password_digest: VARCHAR)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
Table: 
    orders(id: SERIAL PRIMARY KEY, user_id integer[foreign key to users table], status BOOLEAN)
Table: 
    order_products (id: SERIAL PRIMARY KEY, order_id: integer[foreign key to orders table], product_id: integer[foreign key to products table], quantity integer)

