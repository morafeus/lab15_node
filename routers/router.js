const express = require('express');
const controller = require('../controllers/controller');


module.exports = () => {
    let router1 = express.Router();
    router1.get('/', controller.getAll);
    router1.get('/addbutton', controller.addbutton)
    router1.post('/add', controller.addOne);
    router1.get('/update', controller.update);
    router1.post('/updateOne', controller.updateOne);
    router1.post('/delete', controller.delete);
    return router1;
}