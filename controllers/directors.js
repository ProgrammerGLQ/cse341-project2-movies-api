const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags=['Directors']
    const result = mongodb.getDatabase().db('project2').collection('directors'); 
    
    result.find().toArray().then((directors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(directors);
    })
    .catch((err) => {
        console.error(err);
        // Error Handling 500
        res.status(500).json({ message: 'Error retrieving directors.' });
    });
};

const getSingle = async (req, res) => {
    // #swagger.tags=['Directors']
    if (!ObjectId.isValid(req.params.id)) {
        // Error Handling 400
        res.status(400).json('Must use a valid Director ID to find a director.');
        return; 
    }
    const directorId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db('project2').collection('directors'); 
    
    result.find({ _id: directorId }).toArray().then((directors) => {
        if (directors.length === 0) {
            // Error Handling 404
            res.status(404).json({ message: 'Director not found.' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(directors[0]);
    })
    .catch((err) => {
        console.error(err);
        // Error Handling 500
        res.status(500).json({ message: 'Error retrieving director.' });
    });
};

const createdirector = async (req, res) => {
    // #swagger.tags=['Directors']
    const director = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthYear: req.body.birthYear,
        nationality: req.body.nationality
    };
    
    // try/catch
    try {
        const response = await mongodb.getDatabase().db('project2').collection('directors').insertOne(director);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the director.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while creating the director.' });
    }
};

const updatedirector = async (req, res) => {
    // #swagger.tags=['Directors']
    if (!ObjectId.isValid(req.params.id)) {
        // Error Handling 400
        res.status(400).json('Must use a valid Director ID to update a director.');
        return;
    }
    const directorId = new ObjectId(req.params.id);

    const director = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthYear: req.body.birthYear,
        nationality: req.body.nationality
    };
    
    // try/catch  Error Handling 500
    try {
        const response = await mongodb.getDatabase().db('project2').collection('directors').replaceOne({ _id: directorId }, director);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the director.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while updating the director.' });
    }
};

const deletedirector = async (req, res) => {
    // #swagger.tags=['Directors']
    if (!ObjectId.isValid(req.params.id)) {
        // Error Handling 400
        res.status(400).json('Must use a valid Director ID to delete a director.');
        return;
    }
    const directorId = new ObjectId(req.params.id);

    // try/catch Error Handling 500
    try {
        const response = await mongodb.getDatabase().db('project2').collection('directors').deleteOne({ _id: directorId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the director.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while deleting the director.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createdirector,
    updatedirector,
    deletedirector
};