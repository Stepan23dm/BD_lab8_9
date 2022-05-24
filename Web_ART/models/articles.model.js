const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectID = Schema.ObjectID;

var Articles = mongoose.Schema({
    name_article: {
        type: String, 
        required: 'This field is required.'
    },
    aut_name: {
        type: String,
        required: 'This field is required.'
    },
    pub_date: {
        type: Date,
        required: 'This field is invalid.'
    },
    content: {
        type: String,
        required: 'This field is required.'
    },
    text: {
        type: String,
        required: 'This field is required.'
    },
    tags: Array,
    review: {
        name: String,
        comment: String,
        grade: Number
    }
},
{collection: 'Articles'});

var Articles = mongoose.model('Articles', Articles);
