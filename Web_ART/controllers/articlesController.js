const express = require('express');
const { handle } = require('express/lib/application');
const req = require('express/lib/request');
const { get, render } = require('express/lib/response');
const { Model } = require('mongoose');
var router = express.Router();
const mongoose = require('mongoose');
const Articles = mongoose.model('Articles');

var router = express.Router();

router.get('/', (req, res) => {
    res.render("articles/addEdit", {
        viewTitle: "Insert articles"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
    
});

// Insert Article
function insertRecord(req, res){
    var articles = new Articles();
    articles.aut_name = req.body.aut_name;
    articles.name_article = req.body.name_article;
    articles.pub_date = req.body.pub_date;
    articles.content = req.body.content;
    articles.text = req.body.text;
    articles.save((err, doc) => {
        if (!err)
            res.redirect('articles/list');
        else {
            if (err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("articles/addEdit", {
                    viewTitle: "Insert articles",
                    articles : req.body
                });
            }
            console.log('Error during record insertion: ' + err);
        }
    });
}

// Update Article
function updateRecord(req, res){
    Articles.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('articles/list'); }
        else {
            if (err.name == 'ValidationError'){
                res.render("articles/addEdit", {
                    viewTitle: 'Update Article',
                    articles: req.body
                })
            }
            else {
                console.log('Error during record update: ' + err);
            }
        }
    }).lean();
}

// List all articles 
router.get('/list', (req, res) => {
    Articles.find((err, docs) => {
        if (!err) {
            res.render("articles/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving articles list :' + err);
        }
    }).lean();
});

// Search article 
router.get('/searchArt', (req, res) => {
    const name = req.query.artname;
    Articles.find({name_article: name}, (err, docs) => {
        if (!err) {
            res.render("articles/searchArt", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving searchArt list :' + err);
        }
    }).lean();
});

// View article 
router.get('/search/:id', (req, res) => {
    const nameId = req.params.id;
    Articles.find({ _id: nameId }, (err, doc) => {
        if (!err) {
            res.render("articles/viewArt", {
                viewTitle: "View Article",
                list: doc
            });
        }
        else {
            console.log('Error in retrieving searchArt list :' + err);
        }
    }).lean();
});

// List all authors
router.get('/listAut', (req, res) => {
    Articles.find((err, docs) => {
        if (!err) {
            res.render("articles/listAut", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving author list :' + err);
        }
    }).lean();
});

// Search author
router.get('/searchAut', (req, res) => {
    const nameaut = req.query.autname;
    Articles.find({aut_name: nameaut}, (err, docs) => {
        if (!err) {
            res.render("articles/searchAut", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving searchAut list :' + err);
        }
    }).lean();
});

// Validation for empty input
function handleValidationError(err, body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'name_article': 
                body['name_articleError'] = err.errors[field].message;
                break;
            case 'aut_name':
                body['aut_nameError'] = err.errors[field].message;
                break;
            case 'pub_date':
                body['pub_dateError'] = err.errors[field].message;
                break;
            case 'content':
                body['contentError'] = err.errors[field].message;
                break;
            case 'text':
                body['textError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

// Search at date
router.get('/searchDate', (req, res) => {
    const namedate1 = req.query.datename1;
    const namedate2 = req.query.datename2;
    Articles.find({ pub_date: {$gte: namedate1, $lte: namedate2 }}, (err, docs) => {
        if (!err) {
            res.render("articles/searchDate", {
                viewTitle: "Search at date",
                list: docs
            });
        }
        else {
            console.log('Error in retrieving searchAut list :' + err);
        }
    }).lean();
});

// Update document
router.get('/:id', (req, res) => {
    Articles.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("articles/addEdit", {
                viewTitle: "Update Article",
                articles: doc
            })
        }
    }).lean();
});

// Delete document
router.get('/delete/:id', (req, res) => {
    Articles.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/articles/list');
        }
        else {
            console.log('Error in article delete: ' + err);
        }
    }).lean();
});

module.exports = router;