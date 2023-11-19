const SQL_QUERY = {
    CHECK_COUNT:'SELECT COUNT(*) FROM logs',
    CHECK_AND_CREATE_LOGS_TABLE: 
'CREATE TABLE IF NOT EXISTS logs (id INT AUTO_INCREMENT PRIMARY KEY, level VARCHAR(255), message VARCHAR(255), resourceId VARCHAR(255), timestamp TIMESTAMP , traceId VARCHAR(255), spanId VARCHAR(255), commit VARCHAR(255), metadata VARCHAR(255))',
    INSERT_LOGS_INTO_DATABASE: 'INSERT INTO logs (level, message,resourceId,timestamp,traceId,spanId,commit,metadata) VALUES ?',
    FULL_TEXT_SEARCH: "ALTER TABLE logs ADD FULLTEXT ft_index(level,message,resourceId,traceId,spanId,commit);",
    FULL_TEXT_SEARCH_QUERY : "SELECT * FROM `logs` WHERE MATCH(level, message, resourceId, traceId, spanId, commit) AGAINST(?)",
};

module.exports = SQL_QUERY;