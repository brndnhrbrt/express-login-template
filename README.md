# express-login-template

This template is used to create a backend API using express and mongodb

### install dependencies

```
npm install
```

### create a config.js

```
follow config.example.js template
```

### run in dev mode

```
npm run devstart
```

### run

```
npm start
```

### using the api

#### register user

requires username password and repeatPassword

```
/users/register
```

#### login user

requires username and password
returns token

```
/authenticate/login
```

#### user info

requires token

```
/users/userInfo
```