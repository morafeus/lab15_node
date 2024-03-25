const fs = require('fs');
const qs = require('qs');

module.exports = {
    getAll: async (req, resp) => {
        let file = JSON.parse(fs.readFileSync('./directory.json'));
        if(file)
            resp.render('index.hbs', {data: file});
    },
    addbutton: async(req, resp) => {
        let file = JSON.parse(fs.readFileSync('./directory.json'));
        if(file)
            resp.render('addPage.hbs', {data: file});
    },
    addOne: async (req, resp) => {
        var data = ''
        var attr = ''
        req.on('data', function (chunk) {
            data += chunk;
            attr = qs.parse(data)
        });
        fs.readFile('directory.json',(err,data)=>{    
            if(JSON.parse(data).length != 0){
                var id = JSON.parse(data).pop().id;
              }
              else{
                var id = 0;
              }
            var contacts = JSON.parse(data);
            console.log(attr['phone_number'])
            var newContact ={
                id:+id+1,
                name:attr['name'],
                phone_number:attr['phone_number']
            }
            contacts.push(newContact);
            var db = JSON.stringify(contacts);
            console.log(db);
            fs.writeFile('directory.json',db,'utf8',(err)=>{});
        });
        resp.writeHead(302, {'Location': '/'});
        resp.end();
    },
    update: async(req, resp) => {
        let file = JSON.parse(fs.readFileSync('./directory.json'));
        var person = file.find((elem)=> elem.name == req.query.name);
        console.log(person);
        if(file)
            resp.render('updatePage.hbs', {data: file, person: person});
    },
    updateOne: async(req, resp) => {
        var data = ''
        var attr = ''

        req.on('data', function (chunk) {
            data += chunk;
            attr = qs.parse(data)
        });

        fs.readFile('directory.json',(err,data)=>{    
            var contacts = JSON.parse(data);
            console.log(attr['phone_number'])
            var newContact ={
                id:attr['id'],
                name:attr['name'],
                phone_number:attr['phone_number']
            }
            console.log(newContact);
            var index = contacts.findIndex(elem => elem.id == attr['id'])
            contacts[index] = newContact;
            var db = JSON.stringify(contacts);
            fs.writeFile('directory.json',db,'utf8',(err)=>{});
        });
        resp.writeHead(302, {'Location': '/'});
        resp.end();
    },
    delete: async(req, resp) => {
        var data = ''
        var attr = ''
        req.on('data', function (chunk) {
        data += chunk;
        attr = JSON.parse(data)
        console.log(data)
        });
        fs.readFile('directory.json',(err,data)=>{
            var contacts = JSON.parse(data);
            console.log(attr['name'])
            contacts = contacts.filter(elem => elem.name != attr['name'])
            console.log(contacts)
            var db = JSON.stringify(contacts);
            fs.writeFile('directory.json',db,'utf8',(err)=>{});
            resp.writeHead(302, {'Location': '/' });
            resp.end()
        });
    }
}