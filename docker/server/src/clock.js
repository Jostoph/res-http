const http = require('http');

const port = 8080;

const server = http.createServer(onRequest);

server.listen(port, console.info(`Server-clock listening on port ${port}`));

server.on('error', onError);

function onRequest(req, res) {

    let type = req.headers.accept;

    const now = new Date();
    let time = {
        hours: now.getHours(),
        minutes: now.getMinutes()
    };

    if(type == 'application/xml') {
        time = 
        `<time>
            <hours>${time.hours}</hours>
            <minutes>${time.minutes}</minutes>
        </time>`
    } else {
        type = 'application/json'
        time = JSON.stringify(time);
    }
    res.writeHead(200, {'Content-Type': type});
    
    console.info(`sending : ${time} as ${type}`);
    res.write(time);
    res.end();
}

function onError(err) {
    throw err;
}
