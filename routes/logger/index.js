const sqlConnection = require('../../database/mySql');
const SQL_QUERY = require('../../constants/queries');

const logger =  (req, res) => {
    const log = req.body;
    const headers = req.headers;

    const { level , message  , resourceId , timestamp , traceId ,spanId , commit , metadata} = log;
    // to insert into the database
    // JavaScript example to convert ISO 8601 to MySQL/MariaDB DATETIME format
    const isoDateTime = timestamp;
    const date = new Date(isoDateTime);
    const formattedDateTime = date.toISOString().slice(0, 19).replace('T', ' ');
        var sql = SQL_QUERY.INSERT_LOGS_INTO_DATABASE;
        var values = [
          [ level,
            message,
            resourceId,
            formattedDateTime,
            traceId,
            spanId,
            commit,
            metadata?.parentResourceId]
        ];
        sqlConnection.query(sql, [values], function (err, result) {
          if (err) console.log(err);
          console.log("1 record inserted");
          console.log(result);
        });

    res.send('OK');
};

module.exports = logger;