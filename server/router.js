function route(pathname, handle, response) {

    // favicon.ico 요청 무시
    if (pathname === '/favicon.ico') {
        return;
    }

    console.log('pathname : ' + pathname);

    if (pathname === '/favicon.ico') {
        return;
    }

    if (typeof handle[pathname] === 'function') {
        handle[pathname](response);
    } else {
        response.writeHead(404, {'Content-Type' : 'text/html'});
        response.write('This webpage is progressing');
        response.end();

        console.log('No request handler found for ' + pathname);
    }
}

exports.route = route;