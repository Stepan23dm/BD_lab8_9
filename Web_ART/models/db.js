const mongoose = require('mongoose');
//Connection to MongoDB
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}, (err) => {
    if (!err) {console.log('MongoDB connection succeeded.')}
    else {console.log('Error in MongoDB connection: ' + err)}
});

require('./articles.model');