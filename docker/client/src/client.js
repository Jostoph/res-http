const http = require('http');

let type = 'json';

if(process.argv.length == 3) {
    if(process.argv[2] == 'xml') {
        type = 'xml';
    } else if(process.argv[2] != 'json') {
        throw 'invalid arguments';
    }
}

const options = {
    hostname: 'localhost',
    port: 8080,
    method: 'GET',
    headers: {
        accept: `application/${type}`
    }
};

const request = http.request(options, onResponse);
request.end();

function onResponse(response) {

    let message = '';

    response.on('data', (data) => {
        message += data;
    });

    response.on('end', () => {
        console.info(`It is ${message}`);
    });
}