const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags=['Movies']
    const result = mongodb.getDatabase().db('project2').collection('movies'); 
    
    result.find().toArray().then((Movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving movies.' });
    });
};

const getSingle = async (req, res) => {
    // #swagger.tags=['Movies']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid Movie ID to find a movie.');
        return; 
    }
    const movieId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db('project2').collection('movies'); 
    
    result.find({ _id: movieId }).toArray().then((movies) => {
        if (movies.length === 0) {
            res.status(404).json({ message: 'Movie not found.' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies[0]);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving movie.' });
    });
};

const createmovie = async (req, res) => {
    // #swagger.tags=['Movies']
    const movie = {
        name: req.body.name,
        genre: req.body.genre,
        subgenre: req.body.subgenre,
        releaseYear: req.body.releaseYear,
        rating: req.body.rating,
        countryOfOrigin: req.body.countryOfOrigin,
        language: req.body.language
    };
    const response = await mongodb.getDatabase().db('project2').collection('movies').insertOne(movie);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the movie.');
    }
};

const updatemovie = async (req, res) => {
    // #swagger.tags=['Movies']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid Movie ID to update a movie.');
        return;
    }
    const movieId = new ObjectId(req.params.id);
    const movie = {
        name: req.body.name,
        genre: req.body.genre,
        subgenre: req.body.subgenre,
        releaseYear: req.body.releaseYear,
        rating: req.body.rating,
        countryOfOrigin: req.body.countryOfOrigin,
        language: req.body.language
    };
    const response = await mongodb.getDatabase().db('project2').collection('movies').replaceOne({ _id: movieId }, movie);
    // console.log(response)
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the movie.');
    }
};

const deletemovie = async (req, res) => {
    // #swagger.tags=['Movies']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid Movie ID to delete a movie.');
        return;
    }
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project2').collection('movies').deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createmovie,
    updatemovie,
    deletemovie
};