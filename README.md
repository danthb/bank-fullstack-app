# Badbank 
## FullStack App with MERN

Badbank is a fullstack application developed with MERN 

- Mongo
- Express
- React
- NodeJS

## Features

- Firebase Authentification
- NoSQL Database
- Mongoose 
- Lazy React
- MaterialUI
- Bootstrap



Badbank is a lightweight application where you can create a user, login, deposit, withdraw and check your balance.

> The main objective of Badbank is to explore
> the whole MERN stack.


## Installation

Badbank requires [Node.js](https://nodejs.org/) v14+ to run.
First, clone the repository
```sh
git clone https://github.com/danthb/bank-fullstack-app.git
```
Install the frontend dependencies.

```sh
cd bank-fullstack-app
cd frontend
npm install
```

Install the backend dependencies.

```sh
cd ..
cd backend
npm install
```
Run frontend
```sh
cd frontend
npm start
```
Run backend
```sh
cd backend
node index.js
```
Before run take into account that you need to create a project on the firebase website to copy tour own firebase project keys. After you should generate a file with the data needed in this path /bank-fullstack-app/backend/config/serviceAccountKey.json; you can generate that data from the project configuration. No doubt that there is more than one tutorial to do this.
https://firebase.google.com/docs?authuser=0

Database installation 
If you don't have mongo in your computer can use a docker image.
Start a container with MongoDB Image (docker run -d -p 27017:27017 mongo)

Also, there are two .env.examples with the referential data that you need like environmental variables.
## 


## Development

Want to contribute? Great!

## License

MIT License

Copyright (c) 2021 Hector Tenezaca

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the License conditions.
