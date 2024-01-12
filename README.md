# E-Commerce Website (MERN Stack)

## E-Commerce Website
An e-commerce website for selling mobile devices, full of features like quickview, manage user-account, add-to-cart, check out, filter list product in Client page. In Admin Page, it has many features to manage the shop. Includes summary revenue dashboard, add/edit/delete product, chat directly with customer. The demo apps was deployed on Render and Firebase.

## Demo

\*Note: Please open link server-side first.

- Server side: [Link](https://boutique2-2v5d.onrender.com/)
- Client side: [Link](https://asm3-client-504fd.web.app/)
- Admin side: [Link](https://asm3-admin-d1c99.web.app/)
- Client-role account: `email: test@test.com`, `password: 12345678`
- Admin-role account: `email: test2@test.com`, `password: 12345678`

## Project Breakdown

### API Server

- Directory: Server
- Features:
  - [x] Building API server (MVC model) - CRUD operations.
  - [x] Generating schema models.
  - [x] Session-cookie to store data login user.
  - [x] Authenticating, encrypt password with bcrypt.
  - [x] Live chat with socket.io.

### Client App

- Directory: Client App
- Features:
  - [x] Login, sign up account.
  - [x] Home page, shop page, detail product page.
  - [x] Cart page, check out page, history orders page (for logged in user).
  - [x] Redux/redux-toolkit to store data.
  - [x] React-router.
  - [x] Live chat.
  - [x] Send email when order successfully.

### Admin App

- Directory: Admin App
- Features: 
  - [x] Login.
  - [x] Dashboard page - summarize data.
  - [x] Create/update/delete products.
  - [x] Show and manage orders of users.
  - [x] Live chat with customer.

### Deployment on local

#### Prerequisites

- MongoDB 
- NodeJS
- npm

#### Client-side (Dir: Client App)
- Access src/util/url.js, change root to 'http://localhost:5000' (domain of server on port 5000).

```
$ cd  client      // go to client folder
$ yarn # or npm i     // install packages
$ npm start     // run it locally
```

#### Admin-side (Dir: Admin App)
- Access ./src/utils/url.js, change root to 'http://localhost:5000' (domain of server on port 5000).

```
$ cd  Admin App      // go to client folder
$ yarn # or npm i     // install packages
$ npm start     // run it locally
```

#### Server-side (Dir: Server)
- Access ./src/utils/url.js, change root to 'http://localhost:5000' (domain of server on port 5000).
- In ./nodemon.json, add your mongoDB credential
- Create products collection by import ./products.json file

```
$ cd  Admin App      // go to client folder
$ yarn # or npm i     // install packages
$ npm run start:dev     // run it locally
```
