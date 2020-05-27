


const reqHandler = (req, res)=>{
    const url = req.url;
    const method = req.method;
    const body = [];
    if(url === '/'){
        res.write('<html>');
        res.write('<head>');
        res.write('</head>');
        res.write('<body>');
        res.write('<h1>Hey, welcome to my page!</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="user" placeholder="username"><button type="submit">create user</button></form>')
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    else if (url ==='/users'){
        res.write('<html>');
        res.write('<head>');
        res.write('</head>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>dummy1</li>');
        res.write('<li>dummy2</li>');
        res.write('<li>dummy3</li>');
        res.write('<li>dummy4</li>');
        res.write('<li>dummy5</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/create-user' && method === 'POST'){
        req.on('data', (chunk) =>{
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end', ()=>{
            const user = Buffer.concat(body).toString();
            const userText = user.split('=')[1];
            console.log(userText);
        })
        res.statusCode = 302;
        res.setHeader('Location', '/')
        res.end();
    }

}



module.exports = reqHandler;
