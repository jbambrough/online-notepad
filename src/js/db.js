const pg = require('pg');

// create a config to configure both pooling behavior
var config = {
    user: 'aswspxtaryfbdw',
    host: 'ec2-54-235-181-120.compute-1.amazonaws.com',
    database: 'd1clm4vfcqfk3',
    password: '8f8346f7fce1a501f762278531f61750004e1a7a1135ac54bb1e8dff07fbc828'
}

// this initializes a connection pool
const pool = new pg.Pool(config);

// Pool error handling
pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

// export the query method for passing queries to the pool
module.exports.query = function (text, values, callback) {
    console.log('query:', text, values);
    return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = function (callback) {
    pg.defaults.ssl = true;
    return pool.connect(callback);
};