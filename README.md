# XAM - Examination Assessment Model

> The system is designed to evaluate the test-takers and assign appropriate grades. This system is built on the concept of using IRT to generate the questions to be delivered to each test-taker based on their probability of answering the previous set questions and evaluate the answers.

## Technologies used 🛠️

- [React](https://reactjs.org/) - Front end UI Library
- [Express](https://expressjs.com/en/starter/installing.html) - Backend Framework
- [NodeJS](https://nodejs.org/en/docs/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [MongoDB](https://docs.mongodb.com/manual/) - NoSQL database
- [Shards](https://scrollrevealjs.org/) - A high-quality & free React UI kit featuring a modern design system with dozens of custom components.

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites 📋

You'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [NPM](http://npmjs.com)) installed on your computer.

```
node@v10.16.0 or higher
npm@6.9.0 or higher
git@2.17.1 or higher
```

## How To Use 🔧

From your command line, first clone XAM:

```bash
# Clone this repository
$ git clone https://github.com/devdaemon404/xam.git

# Go into the repository
$ cd xam

# Remove current origin repository
$ git remote remove origin
```

Then you can install the dependencies either using NPM or Yarn:

Using NPM:

```bash
# Install dependencies
$ npm install
$ npm client-install

```

## Usage

### Mongo connection setup and JWT Secret

Create a file name called dev.js to /config with correct field name (mongoURI,jwtSecret)
Make sure you paste the correct mongoDB URI in dev.js

```js
module.exports = {
  mongoURI: 'mongodb://localhost:27017/xamDB',
  jwtSecret: 'jwtSecret',
};
```

### Run Application

```bash
npm run dev     # Express & React :3000 & :5000
npm run server  # Express API Only :5000
npm run client  # React Client Only :3000

```
