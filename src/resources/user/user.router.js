const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('./user.model');

router.post('/register', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'email already exists',
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,
                            type: req.body.type,
                        });

                        user.save()
                            .then((result) => {
                                res.status(201).json(result);
                            })
                            .catch((err) => {
                                res.status(500).json({ error: err });
                            });
                    }
                });
            }
        });
});

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'authentication failed',
                });
            }

            bcrypt.compare(
                req.body.password,
                user[0].password,
                (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'authentication failed',
                        });
                    }

                    if (result) {
                        const token = jwt.sign(
                            {
                                userId: user[0]._id,
                                email: user[0].email,
                                type: user[0].type,
                                firstName: user[0].firstName,
                            },
                            'secret', {
                            expiresIn: '1h',
                        }
                        );

                        return res.status(200).json({
                            message: 'authentication successful',
                            token: token,
                        });
                    }

                    res.status(401).json({
                        message: 'authentication failed',
                    });
                }
            );
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;