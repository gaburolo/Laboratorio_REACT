const express = require('express')
const https = require('https')
const cors = require('cors')

const { config } = require('./config')
const { getCurrentTime, filterProperties, pagination } = require('./util')
let { spaces } = require('./db')

const app = express();
app.use(express.json());
app.use(cors());

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Parking API',
            version: '1.0.0',
            description: 'Customer Parking API',
            contact: {
                name: 'Martin Calderón',
                email: 'martinrolo22tec@gmail.com',
                url: 'https://github.com/gaburolo/Laboratorio_REACT'
            }
        },
        servers: [
            {
                'url': 'http://localhost:8000',
                'description': 'Local server development'
            }
        ],
    },
    apis: ['./index.js']
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

const sslServer = https.createServer(config.ssl, app);

// Add headers before the routes are defined
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

//Routes

/**
 * @swagger
 * components:
 *  schemas:
 *      Spaces:
 *          type: object
 *          required:
 *              - detail
 *          properties:
 *              id:
 *                  type: number
 *                  description: The auto-generated id of the space
 *              state:
 *                  type: string
 *                  description: The state of the space
 *              detail:
 *                  type: string
 *                  description: The parking information
 *              licensePlate:
 *                  type: string
 *                  description: The license plate of the car 
 *              checkIn:
 *                  type: string
 *                  description: The check-in time
 *              reserved:
 *                  type: boolean
 *                  description: Is the parking reservation?
 *          example:
 *              id: 10
 *              state: in-use
 *              detail: indoor-parking
 *              licensePlate: 8652855
 *              checkIn: 14:57
 *              reserved: true
 *      PPDSpaces:
 *          type: object
 *          required:
 *              - detail
 *          properties:
 *              detail:
 *                  type: string
 *                  description: The parking information
 *          example:
 *              detail: indoor-parking
 *      PPDReservetion:
 *          type: object
 *          required:
 *              - licensePlate
 *          properties:
 *              licensePlate:
 *                  type: string
 *                  description: The license plate of the car
 *          example:
 *              licensePlate: 56225856
 *      Error:
 *          type: object
 *          properties:
 *              menssage:
 *                  type: string
 *                  description: Error message
 *                  example: Not found
 *              internal_code:
 *                  type: string
 *                  description: Error internal code
 *                  example: Invalid parameters
 */

/**
 * @swagger
 * tags: 
 *     - name: Spaces
 *       description: The Parking Spaces managing
 *     - name: Reservation
 *       description: The Parking Reservation managing
 */


// Server landing
app.get('/',(req,res)=>{
    return res.send('Node JS api');
});

/**
 * @swagger
 * /api/spaces:
 *  get:
 *      summary: Return list of all spaces
 *      tags: [Spaces]
 *      responses:
 *          200:
 *              description: The list of the spaces
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Spaces'
 *          404:
 *              description: The request not found
 *              content:
 *                  applocation/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */

// [GET] /api/spaces/
app.get('/api/spaces',(req,res)=>{
    const state = req.query.state;
    let _spaces = [...spaces];

    // filter by state
    if(state === 'free') {
        _spaces = _spaces.filter(s => s.state === 'free');
    } else if (state === 'in-use') {
        _spaces = _spaces.filter(s => s.state === 'in-use');
    }

    
    _spaces = pagination(_spaces,req);

    // Apply filter for object properties
    let filter = req.query.filter;
    if(filter) {
        filter = filter.split(',');
        _spaces = filterProperties(filter,_spaces);
    }
    

    return res.status(200).send(_spaces);
});


/**
 * @swagger
 * /api/spaces/{id}:
 *  get:
 *      summary: Get the space by id
 *      tags: [Spaces]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *               type: number
 *            required: true
 *            description: The space id
 *      responses:
 *          200:
 *              description: The space description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Spaces'
 *          404:
 *              description: The request not found
 *              content:
 *                  applocation/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */

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


/**
 * @swagger
 * /api/spaces:
 *  post:
 *      summary: Create a new Space
 *      tags: [Spaces]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PPDSpaces'
 *      responses:
 *          201:
 *              description: The space was duccessfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Spaces'
 *          404:
 *              description: The request not found
 *              content:
 *                  applocation/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */

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

/**
 * @swagger
 * /api/spaces/{id}:
 *  put:
 *      summary: Update the space by the id
 *      tags: [Spaces]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            required: true
 *            description: The space id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PPDSpaces'
 *      responses:
 *          200: 
 *              description: The space was duccessfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Spaces'
 *          404:
 *              description: The request not found
 *              content:
 *                  applocation/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */

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

/**
 * @swagger
 * /api/spaces/{id}:
 *  delete:
 *      summary: Remove the space by the id
 *      tags: [Spaces]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            required: true
 *            description: The space id
 *      responses:
 *          200: 
 *              description: The space deleted
 *          404:
 *              description: The space not found
 *          403:
 *              description: The space cannot be deleted because it is occupied
 */

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

/**
 * @swagger
 * /api/reservations:
 *  get:
 *      summary: Return list of all spaces is true
 *      tags: [Reservation]
 *      responses:
 *          200:
 *              description: The list of the spaces with reservation
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Spaces'
 *          404:
 *              description: The request not found
 *              content:
 *                  applocation/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */

// [GET] /api/reservations
app.get('/api/reservations',(req,res) => {
    let inUseSpaces = [];
    spaces.forEach( space => {
        if(space.reserved) {
            inUseSpaces.push(space);
        }
    });


    inUseSpaces = pagination(inUseSpaces,req);

    // Apply filter for object properties
    let filter = req.query.filter;
    if(filter) {
        filter = filter.split(',');
        inUseSpaces = filterProperties(filter,inUseSpaces);
    }

    return res.status(200).send(inUseSpaces);
});

/**
 * @swagger
 * /api/reservations:
 *  post:
 *      summary: Create a new Reservation
 *      tags: [Reservation]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PPDReservetion'
 *      responses:
 *          201:
 *              description: The reservation was duccessfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Spaces'
 *          202:
 *              description: The request not found
 *              content:
 *                  applocation/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */

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

/**
 * @swagger
 * /api/reservations/{id}:
 *  delete:
 *      summary: Remove the space by the id
 *      tags: [Reservation]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            required: true
 *            description: The space id
 *      responses:
 *          200: 
 *              description: The reservation was deleted
 *          404:
 *              description: The reservation of space not found
 */

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


app.listen(config.httpPort,() => console.log(`Server running 🚀 on port: ${config.httpPort}... `));
sslServer.listen(config.httpsPort,() => console.log(`Secure server 🚀🔑 on port: ${config.httpsPort}... `));
