# Stalker

## Description
Stalker is a MERN stack application designed to book cinema tickets.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

npm install
cd server
npm install
cd ..
npm install express stripe
npm install @stripe/stripe-js @stripe/react-stripe-js
cd client
npm install
npm install react react-dom
npm install antd
npm install redux react-redux
cd ..
npx nodemon server
cd client
npm start
cd..
nodemon server/server
Open your browser and go to http://localhost:3000
## Configuration
Create a .env file in the server directory and add the following:
MONGO_URL=mongodb+srv://alexandrosar:alexandrosar@cluster0.mykovht.mongodb.net/stalker-unipi
JWT_SECRET=stalker-unipi
STRIPE_KEY="sk_test_51PU4eVP2an5rwTnG7IzGgyaiaNfCOlrTR5cXYnexiQ0YZzyoV4RpFRCm2d9rSJOw4gY8xTMWR92SYsTO9rIXyl6n006Cx05vy5"
PORT=5000

### Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Clone the Repository
```bash
git clone https://github.com/aristeridis/Stalker.git
cd Stalker

