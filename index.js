// a very basic web server 
const http = require('http');
const path = require('path');
const fs = require('fs');

PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    /*     if(req.url == '/about'){
            fs.readFile(path.join(__dirname,'public','about.html'),(err,data) => {
                if(err) throw err;
                res.writeHead(200,{'contentType':'text/html'});
                res.end(data);
            });
        }
     */
    /*   if(req.url == '/api/user'){
          let file = [
              {'name':'John','age':45},
              {'name':'Bob','age':67}
          ]
          res.writeHead(200,{'content-type':'application/json'});
          res.end(JSON.stringify(file));
      } */

    // creating dynamic addresses
    let filepath = path.join(__dirname, 'public', req.url == '/' ? 'index.html' : req.url);

    // this gives you the extension name which helps ylou decide the file type 
    const extname = path.extname(filepath);
    console.log(extname);

    // setting the initial file type
    let contentType = 'text/html';

    // we will use switch-case to decide the contentType based on different extensions

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;

        case '.css':
            contentType = 'text/css';
            break;

        case '.json':
            contentType = 'application/json';
            break;


        case '.png':
            contentType = 'image/png';
            break;


        case '.jpg':
            contentType = 'image/jpg';
            break;

        case '.jpeg':
            contentType = 'image/jpeg';
            break;



    }

    fs.readFile(filepath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(404, { 'content-type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                res.writeHead(500);
                res.end(`Server-Error:${err.code}`);
            }
        } else {

            res.writeHead(500, { 'content-type': contentType });
            res.end(content, 'utf8');
            console.log('content-type', contentType);
            console.log(filepath);
        }
    })


});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`)
})

