const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();
var pool = require('./src/js/db');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

// Allow pass through for requests. Would apply proper security controls later
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

// HTTP GET notes
router.route('/notes').get(function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("There was an Error: ", err);
    }
    var filter = ''
    if (req.query.order && (req.query.order === 'asc' || (req.query.order === 'desc'))) {
      filter = ` order by create_date ${req.query.order}`;
    }

    if (req.query.limit) {
      filter = `${filter} limit ${req.query.limit}`;
    }

    client.query('select * from notes' + filter, function (err, result) {
      if (err) {
        console.log('There was an ERROR: ', err);
        res.send("Error: " + err);
      } else {
        res.json(result.rows);
        done();
      }
    })
  })
})

router.route('/notes/:id').get(function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("There was an Error: ", err);
    }

    client.query('select * from notes where id = $1', [req.params.id], function (err, result) {
      if (err) {
        console.log('There was an ERROR: ', err);
        res.send("Error: " + err);
      } else {
        res.json(result.rows);
        done();
      }
    })
  })
})

// HTTP POST - new note
router.route('/notes').post(function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("There was an Error: ", err);
    }

    client.query('insert into notes (note_text, create_date, user_name) values ($1, $2, $3)', [req.body.note, new Date(), 'Test User'], function (err, result) {
      if (err) {
        console.log('There was an ERROR: ' + err);
        res.send("Error: " + err);
      } else {
        res.json(result.rows);
        done();
      }
    })
  })
})

// HTTP DELETE - specific note
router.route('/notes/:id').delete(function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("There was an Error: ", err);
    }

    client.query('delete from notes where id = $1', [req.params.id], function (err, result) {
      if (err) {
        console.log('There was an ERROR: ' + err);
        res.send("Error: " + err);
      } else {
        res.json(result.rows);
        done();
      }
    })
  })
})

// HTTP PUT (UPDATE) - specific note
router.route('/notes').put(function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("There was an Error: ", err);
    }

    client.query('update notes set note_text = $1 where id = $2', [req.body.note, req.body.id], function (err, result) {
      if (err) {
        console.log('There was an ERROR: ' + err);
        res.send("Error: " + err);
      } else {
        res.json(result.rows);
        done();
      }
    })
  })
})

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(PORT, error => {
  error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
});
