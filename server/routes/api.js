const express = require('express');
const jwt = require('jsonwebtoken');

const { loginUser, registerNewUser } = require('../services/user-services');
const router = express.Router();


function verifyToken(req, res, next) {
    if (!req.headers.authorization) return res.status(401).send('Unauthorized request')
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') return res.status(401).send('Unauthorized request')
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) return res.status(401).send('Unauthorized request')
    req.userId = payload.subject
    next()
}


router.get('/', (req, res) => {
    res.send('Hello from basic API route');
});


// register new user to db
router.post('/register', registerNewUser);

// login user
router.post('/login', loginUser);


// get events
router.get('/events', (req, res) => {
    let events = [{
            "_id": "1",
            "name": "Auto expo",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto expo",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto expo",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto expo",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto expo",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto expo",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "7",
            "name": "Auto expo",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "8",
            "name": "Auto expo",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "9",
            "name": "Auto expo",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        }
    ];
    res.json(events);
});

// get members events
router.get('/special', verifyToken, (req, res) => {
    let membersEvents = [{
            "_id": "1",
            "name": "Member's only events",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Member's only events",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Member's only events",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Member's only events",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Member's only events",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Member's only events",
            "description": "lorem ipsum",
            "date": "2013-04-23T18:25:43.511Z"
        }
    ];
    res.json(membersEvents);
});


module.exports = router;