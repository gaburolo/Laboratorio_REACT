const express= require('express')
const cors=require('cors')
const app=express();


//app.use(express.json());
app.use(cors());


const espacios =[
    {id:1, state: 'in-use', detalle:"Discapacitados", vehiculo: true, placa:"8496321", horaIngreso:"14:57",reservado:false},
    {id:2, state: 'in-use', detalle:"Normal",vehiculo: true, placa:"2696329", horaIngreso:"14:57",reservado:true},
    {id:3, state: 'in-use', detalle:"Normal",vehiculo: true, placa:"8652855", horaIngreso:"14:57",reservado:false},
    {id:4, state: 'free', detalle:"Normal",vehiculo: false, placa:"", horaIngreso:"",reservado:false},
];


app.get('/',(req,res)=>{
    res.send('Node JS api');
});

//GET SPACES
app.get('/api/spaces',(req,res)=>{
    res.send(espacios);
});

//GET SPACES/{id}
app.get('/api/spaces/:id',(req,res)=>{
    const espacio=espacios.find(c => c.id===parseInt(req.params.id) );
    if(!espacio) return res.status(405).send('Espacio no encotrado');
    res.send(espacio);
});

//POST SPACES
app.post('/api/spaces',(req,res)=>{
    const espacio={
        id:espacios[espacios.length-1].id+1,
        state:'free',
        detalle:req.body.detalle,
        vehiculo:false,
        placa:"",
        horaIngreso:"",
        reservado:false,
    }
    espacios.push(espacio);
    res.send(espacio);
});

//PUT SPACES/{id}
app.put('/api/spaces/:id',(req,res)=>{
    
    const espacio=espacios.find(c => c.id===parseInt(req.params.id) );
    if(!espacio) return res.status(405).send('Espacio no encotrado');
    const index = espacios.indexOf(espacio);
    const espacioModi={
        id:espacios[index].id,
        state:req.body.state,
        detalle:req.body.detalle,
        vehiculo:req.body.vehiculo,
        placa:req.body.vehiculo,
        horaIngreso: req.body.horaIngreso,
    }

    res.send(espacioModi);
});

//DELETE SPACES/{id}
app.delete('/api/spaces/:id',(req,res)=>{
    const espacio=espacios.find(c => c.id===parseInt(req.params.id) );
    if(!espacio) return res.status(405).send('Espacio no encotrado');
    const index = espacios.indexOf(espacio);
    if(espacios[index].vehiculo !='') return res.status(405).send('Vehiculo en el espacio que desea eliminar');
    espacios.splice(index,1);
    res.send(espacio);
});

//GET RESERVATIONS
app.get('/api/reservations',(req,res)=>{
    const espaciosUso =[];
    for(let i=0; i<espacios.length;i++){
        if(espacios[i].vehiculo !=''){
            espaciosUso.push(espacios[i]);
        }
    }
    res.send(espaciosUso);
});
//POST RESERVATIONS
app.post('/api/reservations',(req,res)=>{
    for(let i=0; i<espacios.length;i++){
        if(espacios[i].vehiculo == false){
            espacios[i].state='In-use';
            espacios[i].vehiculo=true;
            espacios[i].placa=req.body.placa;
            espacios[i].reservado=true;
            espacios[i].horaIngreso=req.body.horaIngreso;
            res.send(espacios[i]);
            return 0;
        }
    }
    return res.status(405).send('No hay espacios');
});

//DELETE RESERVATIONS/{id}
app.delete('/api/reservations/:id',(req,res)=>{
    const espacio=espacios.find(c => c.id===parseInt(req.params.id) );
    if(!espacio) return res.status(405).send('Espacio no encotrado');
    const index = espacios.indexOf(espacio);
    if(espacios[index].vehiculo == true){
        espacios[index].state='Free';
        espacios[index].vehiculo=false;
        espacios[index].placa="";
        espacios[index].reservado=false;
        espacios[index].horaIngreso="";
        res.send(espacios[index]);
    }else{
        return res.status(405).send('Espacio no esta reservado')
    }

});




const port=process.env.port || 80;
app.listen(port,()=>console.log(`Escuchando en el pueto ${port}...`));