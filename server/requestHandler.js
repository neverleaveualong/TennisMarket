const fs = require('fs');
const main_view = fs.readFileSync('./../main.html', 'utf-8');
const buy_view = fs.readFileSync('./../buy.html', 'utf-8');
const order_view = fs.readFileSync('./../orderlist.html','utf-8');

const mariadb = require('./../database/connect/mariadb');

const main_css = fs.readFileSync('./../css/main.css', 'utf-8');
const orderlist_css = fs.readFileSync('./../css/orderlist.css', 'utf-8');

function main(response){
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err, rows){
        console.log(rows);
    })

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}

function redRacket(response){
    fs.readFile('./../img/redRacket.png', function(err,data) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(data);
    response.end();
    });
}

function blueRacket(response){
    fs.readFile('./../img/blueRacket.png', function(err,data) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(data);
    response.end();
    });
}

function blackRacket(response){
    fs.readFile('./../img/blackRacket.png', function(err,data) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(data);
    response.end();
    });
}

function order(response, productId) {
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", function(err, rows){
        console.log(rows);
    })

    response.write(buy_view);
    response.end();
}

function orderlist(response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    mariadb.query("SELECT * FROM orderlist", function(err,rows){
        console.log(rows);
        response.write(order_view);
        rows.map(item=>{
            response.write("<tr>"
                           +"<td>"+item.product_id+"</td>"
                           +"<td>"+item.order_data+"</td>"
                           +"</tr>");
                        });
        response.write("</table>");
        response.end();
    })
}

function mainhtml(response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}

function maincss(response) {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(main_css);
    response.end();
}

function orderlistcss(response) {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(orderlist_css);
    response.end();
}


let handle = {};
handle['/'] = main;
handle['/order'] = order;

handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

handle['/orderlist.html'] = orderlist;
handle['/main.html'] = mainhtml;

handle['/css/orderlist.css'] = orderlistcss;
handle['/css/main.css'] = maincss;

exports.handle = handle;