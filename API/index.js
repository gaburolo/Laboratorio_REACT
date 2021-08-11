const express = require('express');
const { config } = require('./config');
const { getCurrentTime } = require('./util')
const cors = require('cors');

const app=express();
app.use(express.json());
app.use(cors());


let spaces = [
    {id:1, state: 'in-use', detail:"handicapped-parking", licensePlate: "8496321", checkIn:"14:57",reserved:true},
    {id:2, state: 'in-use', detail:"indoor-parking"     , licensePlate: "2696329", checkIn:"14:57",reserved:true},
    {id:3, state: 'in-use', detail:"indoor-parking"     , licensePlate: "8652855", checkIn:"14:57",reserved:true},
    {id:4, state: 'free'  , detail:"indoor-parking"     , licensePlate: ""       , checkIn:""     ,reserved:false},
];

// Add headers before the routes are defined
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});


// Server landing
app.get('/',(req,res)=>{
    res.send('Node JS api');
});


// [GET] /api/spaces
app.get('/api/spaces',(req,res)=>{
    res.status(200).send(spaces);
});


// [GET] /api/spaces/{id}
app.get('/api/spaces/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const space = spaces.find(c => c.id === id);
    if(!space) {
        res.status(404).json({
            status: 'failed',
            error: `Space with id: ${id} not found`
        }).end();
    } else {
        res.status(200).json(space);
    }
});


// [POST] /api/spaces
app.post('/api/spaces', (req,res) => {
    const newSpace = {
        id:spaces[spaces.length-1].id+1,
        state:'free',
        detail:req.body.detail,
        licensePlate: '',
        checkIn: '',
        reserved:false,
    }
    spaces.push(newSpace);
    res.status(201).json(newSpace);
});


// [PUT] /api/spaces/{id}
app.put('/api/spaces/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const modifiedSpace = req.body;
    const space = spaces.find(c => c.id === id);
    if(!space) {
        res.status(404).json({
            status: 'failed',
            error: `Space with id: ${id} not found`
        }).end();
    } else {
        space.detail = modifiedSpace.detail;
        res.status(200).json(space);
    }
});


// [DELETE] /api/spaces/{id}
app.delete('/api/spaces/:id',(req,res) => {
    const id = parseInt(req.params.id);
    let space = spaces.find(c => c.id === id);
    if(!space) {
        res.status(404).json({
            status: 'failed',
            error: `Space with id: ${id} not found`
        }).end();
    }

    else if(space.reserved) {
        res.status(403).json({
            status: 'failed',
            error: `Space cannot be deleted because it is occupied`
        }).end();
    } else {
        spaces = spaces.filter( s => s.id !== space.id);
        res.status(200).json(space).end();
    }
});


// [GET] /api/reservations
app.get('/api/reservations',(req,res) => {
    const inUseSpaces = [];
    spaces.forEach( space => {
        if(space.reserved) {
            inUseSpaces.push(space);
        }
    });
    res.status(200).send(inUseSpaces);
});


// [POST] /api/reservations
app.post('/api/reservations',(req,res)=>{
    const licensePlate = req.body.licensePlate;
    let success = false;
    spaces.forEach( space => {
        if(!space.reserved && !success) {
            space.state = "in-use";
            space.reserved = true;
            space.licensePlate = licensePlate;
            space.checkIn = getCurrentTime();
            res.status(201).json(space).end();
            success = true;
        }
    });

    if(!success){
        res.status(202).json({
            status: 'failed',
            error: 'The reservation cannot be carried out. All spaces are occupied.'
        }).end();
    }
});

// [DELETE] /api/reservations/{id}
app.delete('/api/reservations/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    let space = spaces.find(c => c.id === id);

    if(!space || !space.reserved) {
        res.status(404).json({
            status: 'failed',
            error: `Reservation of space with id: ${id} not found`
        }).end();
    } else {
        space.state = "free";
        space.reserved = false;
        space.licensePlate = '';
        space.checkIn = '';
        
        res.status(200).json(space);
    }
});


const port = config.port;
app.listen(port,() => console.log(`Listening on port: ${port}...`));
