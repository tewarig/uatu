const sqlConnection = require('../../database/mySql');
const SQL_QUERY = require('../../constants/queries');

const search = (req, res) => {
    const queryParams = req.query;
    const search = queryParams.search;
    const filter = queryParams.filter
    console.log(search);
    sqlConnection.query(SQL_QUERY.FULL_TEXT_SEARCH_QUERY, [search], function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send({
            data: result
        });
    });
};

module.exports = search;