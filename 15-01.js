const express = require('express');
const app = express();
const fs = require('fs');
const url = require('url');
const qs = require('qs');
const handlebars = require('express-handlebars');
const path = require('path');

const hb = handlebars.create({  
	defaultLayout: 'main', 
	extname: 'hbs',
    helpers:{
        Back: 'document.location=\'/\''
    }
    
});
app.use(express.static(__dirname + '/public'));
const routes = require('./routers/router')();
app.engine('hbs', hb.engine);
app.set('view engine', 'hbs');
app.use(routes);
app.listen(3000, () => {});

