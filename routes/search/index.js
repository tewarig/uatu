const sqlConnection = require('../../database/mySql');
const SQL_QUERY = require('../../constants/queries');

const isObject = obj => {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj) && Object.keys(obj).length > 0;
  }

function convertMillisToSqlDate(millis) {
    return new Date(millis).toISOString().slice(0, 19).replace('T', ' ');
}

const search = (req, res) => {
    const queryParams = req.query;
    const search = queryParams.search;
    var page = parseInt(req.query.page) || 1;
    var pageSize = parseInt(req.query.pageSize) || 10;
    var offset = (page - 1) * pageSize;
    let filter = JSON.parse(queryParams.filter);
    if(filter == {} && search == ""){
        res.send({
            data: [] ,
            error: "No search or filter"
        });
    }
    if(search && isObject(filter)){
        console.log("both filter and search");
        let queryString = SQL_QUERY.FULL_TEXT_SEARCH_QUERY;
        let queryValues = [search]; // start with the full-text search term
        let conditions = [];
        for (var key in filter) {
            if (filter.hasOwnProperty(key)) {
                if (key === 'timestamp') {
                    conditions.push("`timestamp` >= ?");
                    queryValues.push(convertMillisToSqlDate(filter[key].from));
                    conditions.push("`timestamp` <= ?");
                    queryValues.push(convertMillisToSqlDate(filter[key].to));
                } else {
                    conditions.push("`" + key + "` = ?");
                    queryValues.push(filter[key]);
                }
            }
        }
        if (conditions.length > 0) {
            queryString += "AND " + conditions.join(' AND ');
        }
        queryString += conditions.join(' AND ');
        queryString += " LIMIT ? OFFSET ?";
        queryValues.push(pageSize);
        queryValues.push(offset);
        sqlConnection.query(queryString, queryValues, function (err, result) {
            if (err) {
                res.send({
                    error: err,
                    data: []
                });
            } else {
                res.send({
                    data: result
                });
            }
        });

    }else if(search){
    sqlConnection.query(SQL_QUERY.FULL_TEXT_SEARCH_QUERY, [search, pageSize, offset], function (err, result) {
        if (err) {
            res.send({
                data: [] ,
                error: err
            });
        }
        console.log(result);
        res.send({
            data: result
        });
    });
   }else if(isObject(filter)){
    console.log(filter);
    // here we can have multiple filters
    let queryString = SQL_QUERY.FILTER_QUERY;
    let queryValues = [];
    let conditions = [];
    for (var key in filter) {
        if (filter.hasOwnProperty(key)) {
            if (key === 'timestamp') {
                conditions.push("`timestamp` >= ?");
                queryValues.push(convertMillisToSqlDate(filter[key].from));
                conditions.push("`timestamp` <= ?");
                queryValues.push(convertMillisToSqlDate(filter[key].to));
              
            } else {
                conditions.push("`" + key + "` = ?");
                queryValues.push(filter[key]);
            }
        }
    }
    queryString += conditions.join(' AND ');
    queryString += " LIMIT ? OFFSET ?";
    queryValues.push(pageSize);
    queryValues.push(offset);


    sqlConnection.query(queryString, queryValues, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send({
            data: result
        });
    });
   }else {

   }
};

module.exports = search;