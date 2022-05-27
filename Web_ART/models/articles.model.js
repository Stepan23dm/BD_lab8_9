const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectID = Schema.ObjectID;

var ChildSchema = mongoose.Schema({
    name: String,
    comment: String,
    grade: Number
})
    
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
    review: [ ChildSchema ]
},
{collection: 'Articles'});

var ChildSchema = mongoose.model('ChildSchema', ChildSchema);

var Articles = mongoose.model('Articles', Articles);
