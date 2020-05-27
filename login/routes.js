const fs = require('fs');


const users = []
let visits = 0;


const handleRequests = (req, res)=>{
    visits+=1;
    if(req.url === '/'){
        const negocio = fs.readFileSync('index.html');
        res.writeHead(200,{'Content-Type': 'text/html', 'Content-Length': negocio.length});
        res.end(negocio);
        return;
    }

    if(req.url === '/signup'){
        const signupPage = fs.readFileSync('./loginfolder/login.html');
        res.writeHead(200,{'Content-Type': 'text/html', 'Content-Length': signupPage.length});
        res.end(signupPage);
        return;
    }
    if(req.url === '/signup/createuser'){
        const data = [];
        req.on('data', chunk => {
            console.log(chunk);
            data.push(chunk);
        });
        req.on('end', ()=>{
            const userData = Buffer.concat(data).toString();
            const dataParsed = JSON.parse(userData);
            const updateResponse = updateUsers(dataParsed.username, dataParsed.password);
            res.writeHead(updateResponse.code, {'Content-Type': updateResponse.resp})
            res.statusCode = updateResponse.code;
            res.end(updateResponse.json);
        })
    }
}

function updateUsers(username, password){
    if(!(username in users)){
        users[username] = password;
        return {
            resp: 'application/json',
            code: 200,
            json: JSON.stringify({"msg": "user created successfully"})
        };
    }
    else{
        return{
            resp: 'application/json',
            code: 400,
            json: JSON.stringify({"msg": "oops! user already exists!"})
        }
    }
}


module.exports = handleRequests;
