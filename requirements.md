Building Web Applications with Node.js and Express - Practice assignment

After finishing the course, please use what you learnt to implement this simple web application using Node.JS and Express.JS: https://k8pee.sse.codesandbox.io/

Functional requirements:

1. You should implement at least 2 pages: Home, products.

2. Use MongoDB to create simple DB contains only product (ID, Name, Image, description) and user (ID, Name, Email, password) collections.

3. Use express template engine (EJS) to implement dynamic pages.

4. Use Express routing for all needed pages, you should have the following routes:

a. /home

b. /products

c. /products:/id

5. Use Mongoose with Express to:

a. Retrieve the products from the database and displaying them on the products page (Use EJS).



Delivery requirements:

1. Please upload the project to GIT repository and send the link.

2. Please upload the project to free hosting like: Heroku and send the link.




Optional (Bonus) requirements:
1. Add the following pages: login, register, admin section contains pages for add/edit/delete products, and the following routes:
a. /login
b. /register
c. /admin
i. /admin/view
ii. /admin/addNew
iii. /admin/edit/:pID
2. In admin section:
a. Display the products in a table.
b. Add “Add new” button above the table that opens new form to add new product. (Bonus: Use Popup-up dialog)
c. In the table with each product add “Edit” button that opens the same “new product” page, but with adding the product id in the route, and retrieves its data for edit.
d. In the table with each product add “Delete” button that deletes the product after a confirmation message.
3. Handle login and registration using passport.js
4. All admin pages should be authorized and shouldn’t open unless after logging in for the authorized users.
5. Make a REST API using node and Express, contains the following endpoints:
a. GET: /product – that gets all products
b. GET: /product/:id – that get the product with the given ID.
c. POST: /product – that inserts new product.
