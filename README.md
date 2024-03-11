# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Setting up ##

* Clone this repo: $ git clone https://github.com/massaracsh7/nodejs2024Q1-service.git

* Go to downloaded folder: $ cd nodejs2024Q1-service.

* Install dependencies: $ npm install

* Rename .env.example to .env

## Available scripts ##

* **npm run start**
Run the app in development mode 

* **npm run start:prod**
Run the app in production mode

* **swagger**
After starting the app you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
