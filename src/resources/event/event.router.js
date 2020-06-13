const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Event = require('./event.model');

router.get('/', (req, res, next) => {
    Event.find()
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

router.get('/:id', (req, res, next) => {
    Event.findById(req.params.id)
        .exec()
        .then((event) => {
            if(event) {
                res.status(200).json(event);
            } else {
                res.status(404).json({
                    error: {
                        message: 'event not found',
                    },
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

// GET events of an specific user
router.get('/created/:id', (req, res, next) => {
    Event.find({ created_by: req.params.id })
        .exec()
        .then((events) => {
            res.status(200).json(events);    
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        date: req.body.date,
        created_by: req.body.created_by,
    });

    event
        .save()
        .then((result) => {
            res.status(201).json({
                message: 'event created',
                created: result,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

router.patch('/:id', (req, res, next) => {
    Event.findByIdAndUpdate(req.params.id, req.body)
        .exec()
        .then((result) => {
            if(result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ error: 'no event to update'})
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

router.delete('/:id', (req, res, next) => {
    Event.remove({ _id: req.params.id })
        .exec()
        .then((result) => {
            res.status(200).json({ result });
        })
        .catch((err) => {
            res.status(404).json({ error: err });
        });
});

module.exports = router;