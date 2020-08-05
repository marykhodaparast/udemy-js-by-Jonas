const fs = require('fs'); //file system to read files
const http = require('http');
const url = require('url');
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);
//console.log(laptopData);
const server = http.createServer((req, res) => {
    //console.log('some one did access the server');
    const pathname = url.parse(req.url, true).pathname;
    console.log(pathname);
    const id = url.parse(req.url, true).query.id;

    //PRODCUTS OVERVIEW
    if (pathname === '/products' || pathname === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        fs.readFile(`${__dirname}/templates/template-overview.html`, `utf-8`, (err, data) => {
            let overviewOutput = data;
            fs.readFile(`${__dirname}/templates/template-card.html`, `utf-8`, (err, data) => {
                const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
                res.end(overviewOutput);
            });
        });
        // res.end('This is the PRODUCTS page');

        //LAPTOP DETAIL
    } else if (pathname === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        fs.readFile(`${__dirname}/templates/template-laptop.html`, `utf-8`, (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        });
    } //IMAGES
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathname)) { //regualr expressions always start with / and end with /

        fs.readFile(`${__dirname}/data/img${pathname}`, (err, data) => {
            res.writeHead(200, {
                'Content-type': 'image/jpg'
            });
            res.end(data);
        });
        //URL NOT FOUND    
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('PAGE NOT FOUND!');
    }

});
server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for reuqest now');
});

function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName); //we use /sth/g because if we have 2 price for example it must replace
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);

    return output;
}