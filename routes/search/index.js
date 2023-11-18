const sqlConnection = require('../../database/mySql');
const SQL_QUERY = require('../../constants/queries');

const search = (req, res) => {
    const queryParams = req.query;
    const search = queryParams.search;
    console.log(search);
    const query = "SELECT * FROM `logs` WHERE MATCH(level, message, resourceId, traceId, spanId, commit) AGAINST(?)";
    sqlConnection.query(query, [search], function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

module.exports = search;