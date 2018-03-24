# Online Notepad
_Here is a [Demo](https://serene-springs-35532.herokuapp.com) of the app_

### OVERIVEW
This is a simple online Notepad application

* Create, Edit, Delete Notes
* React and Redux
* React Routing
* ES6
* Babel
* Lightweight webpack config (for development and production)
* Node.js
* Express
* CSS Animations
* REST API
* Implements Google's [Material Design](https://www.npmjs.com/package/material-ui) for React
* Uses PostgresSQL for data store

### UP & RUNNING
* Install dependencies
`$ npm install` or `$ yarn`

* Fire up a development server:
* `$ npm run dev`

Once the server is running, you can visit `http://localhost:8080/`

### PostgreSQL
Stand up PostreSQL instance (or SQL database of your choice). Simple setup: add 1 table named 'notes' with the following fields. Types may vary depending upon your database:
* id: integer (unique)
* note_text: character varying (500)
* create_date: timestamp
* user_name: character varying (100)

### Linting
_This assumes you have eslint and eslint-watch installed. If you don't, run the following:_
```
$ npm i -g eslint eslint-watch
```
or if you need permissions:
```
$ sudo npm i -g eslint eslint-watch
```

To run the linter once:
```
$ npm run lint
```

To run the watch task:
```
$ npm run lint:watch
```

### Testing

To run the tests:
```
$ npm test
```

### Production Build

To build your production assets and run the server:
```
$ npm start
```
