## wallet app

'Wallet' is a responsive web application built with React. The API is made with Nest.js and serves to the frontend data of ETH wallets and exchange rates.

**Note:** it would be prudent to do make test coverage for the UI and the API. Due to time constraints, development is pending.

## Setup

1- Clone the repository

```bash
% git clone https://github.com/pnestevez/wallet-app.git
```

2- API (prerequisites: Docker and Node)

```bash
% cd wallet-app
% npm install
% npm run prerequisites
% npm start

```

3- FE

```bash
% npm install
% npm start
```

The frontend will run on port 3000 [http://localhost:3000] and the api will run on port 3001 [http://localhost:3001]. The postgres database docker image will run on port 5432.
