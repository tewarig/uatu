# Uatu

Uatu offers a straightforward solution for storing, reviewing, and searching logs. This tool is ideal for developers and teams who need an efficient log management system.

Build with : - 
- Node
- Express
- React 
- Vite 
- My SQL

# Getting Started
## Prerequisites
A SQL server is required. For setting up a server, you can use tools like phpMyAdmin. [how to install my php admin](https://www.ionos.com/digitalguide/websites/web-development/install-phpmyadmin/)

### Installation

1. ### Environment Setup
Add a .env file to your root directory. These are the default values but feel free to modify them as needed:
```
MYSQL_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""
DB_NAME="mysql"
```
2. ### Module Installation
Run the following command to install necessary modules
```
npm run install-module
```
Alternatively, for separate backend and frontend installations, use:
```
cd frontend && npm install 
cd .. && npm install
```
3. ### Running the Server
Uatu runs on localhost:3000 by default. The frontend is served at http://localhost:3000/. To start the app, you can use:
```
npm run start
```
Or to build the frontend separately and then start the server, use:
```
cd frontend && npm run build && cd .. && node index.js
```

# Usage :- 
### Ingesting Logs
- how to ingest log ?
To ingest a log, make a POST request to http://localhost:3000/log with the log object in JSON format in the body. Here's an example using curl:

```
curl --location --request POST 'http://localhost:3000/log' \
--header 'Content-Type: application/json' \
--data-raw ' {
    "id": 1,
    "level": "error",
    "message": "connected to DB",
    "resourceId": "server-69",
    "timestamp": "2023-09-15T02:30:00.000Z",
    "traceId": "meow",
    "spanId": "meow",
    "commit": "meow",
    "metadata": {
     "parentResourceId" : "yo"
    }
  }'
  
```

- ### Searching Through Logs
 You can search through logs either using the UI at ``` localhost:3000 ``` or via API endpoint. Here's an example using curl:
```
curl 'http://localhost:3000/search?search=error&filter=\{\}&page=1' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
  -H 'Connection: keep-alive' \
  -H 'Cookie: ext_name=ojplmecpdpgccookcobabopnaifgidhf' \
  -H 'If-None-Match: W/"750-KIdVUW5+cjuH4/V8aqTMR4vQXRw"' \
  -H 'Referer: http://localhost:3000/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  --compressed
```


# Features -

✅ Ingestion of logs

✅ Filters based on various parameters like level, message, resourceId, timestamp, traceId, spanId, commit, metadata.parentResourceId

✅ Search within specific date ranges

✅ Allow combining multiple filters 

✅ Search 

✅ log copy

# Small Video demo - 

<Video src="./demo.mov" alt="demo video" >




