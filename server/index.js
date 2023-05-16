const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:test123@stutor.nen5zpi.mongodb.net/StuTor?retryWrites=true&w=majority');

const port = 3001;
app.listen(port, () => {
    console.log('server running on port ' + port);
});