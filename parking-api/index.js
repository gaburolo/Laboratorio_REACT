const express = require('express');
const https = require('https');
const { config } = require('./config');
const { getCurrentTime, filterData } = require('./util')
const cors = require('cors');
let { spaces } = require('./db');

const app=express();
app.use(express.json());
app.use(cors());


// Add headers before the routes are defined
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});


// Server landing
app.get('/',(req,res)=>{
    return res.send('Node JS api');
});


// [GET] /api/spaces
app.get('/api/spaces',(req,res)=>{
    const state = req.query.state;
    let _spaces = [...spaces];

    // filter by state
    if(state === 'free') {
        _spaces = _spaces.filter(s => s.state === 'free');
    } else if (state === 'in-use') {
        _spaces = _spaces.filter(s => s.state === 'in-use');
    }

    // Apply filter for object properties
    let filter = req.query.filter;
    if(filter) {
        filter = filter.split(',');
        _spaces = filterData(filter,_spaces);
    }

    return res.status(200).send(_spaces);
});


// [GET] /api/spaces/{id}
app.get('/api/spaces/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const space = spaces.find(c => c.id === id);
    if(!space) {
        return res.status(404).json({
            status: 'failed',
            error: `Space with id: ${id} not found`
        }).end();
    } 
    return res.status(200).json(space);
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
    return res.status(201).json(newSpace);
});


// [PUT] /api/spaces/{id}
app.put('/api/spaces/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const modifiedSpace = req.body;
    const space = spaces.find(c => c.id === id);
    if(!space) {
        return res.status(404).json({
            status: 'failed',
            error: `Space with id: ${id} not found`
        }).end();
    }

    space.detail = modifiedSpace.detail;
    return res.status(200).json(space);
});


// [DELETE] /api/spaces/{id}
app.delete('/api/spaces/:id',(req,res) => {
    const id = parseInt(req.params.id);
    let space = spaces.find(c => c.id === id);
    if(!space) {
        return res.status(404).json({
            status: 'failed',
            error: `Space with id: ${id} not found`
        }).end();
    }

    else if(space.reserved) {
        return res.status(403).json({
            status: 'failed',
            error: `Space cannot be deleted because it is occupied`
        }).end();
    }

    spaces = spaces.filter( s => s.id !== space.id);
    return res.status(200).json(space).end();
});


// [GET] /api/reservations
app.get('/api/reservations',(req,res) => {
    const inUseSpaces = [];
    spaces.forEach( space => {
        if(space.reserved) {
            inUseSpaces.push(space);
        }
    });
    return res.status(200).send(inUseSpaces);
});


// [POST] /api/reservations
app.post('/api/reservations',(req,res)=>{
    const licensePlate = req.body.licensePlate;
    
    for(let space of spaces) {
        if(!space.reserved) {
            space.state = "in-use";
            space.reserved = true;
            space.licensePlate = licensePlate;
            space.checkIn = getCurrentTime();
            return res.status(201).json(space).end();
        }
    }

    return res.status(202).json({
        status: 'failed',
        error: 'The reservation cannot be carried out. All spaces are occupied.'
    });
});


// [DELETE] /api/reservations/{id}
app.delete('/api/reservations/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    let space = spaces.find(c => c.id === id);

    if(!space || !space.reserved) {
        return res.status(404).json({
            status: 'failed',
            error: `Reservation of space with id: ${id} not found`
        }).end();
    }
    
    space.state = "free";
    space.reserved = false;
    space.licensePlate = '';
    space.checkIn = '';
        
    return res.status(200).json(space);
});

const sslServer = https.createServer(config.ssl, app);
const port = config.port;
sslServer.listen(port,() => console.log(`Secure server 🚀🔑 on port: ${port}... `));
