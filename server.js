const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const utils = require('./utils');
const { response } = require('express');


const app = express();

app.use(cors('*'))
app.use(bodyParser.json());

app.get('/',(req,res)=>{

    const query = `select Title , Content , Date-time from reviews order by Date-time desc`;
    db.query(query , (error , result)=>{

        res.send(utils.createResult(error,result))
    

    });
});


app.post("/new", (req,res)=>{

    const { title , content } = req.body;
      var curdatetime = new Date();

    const query = `insert into reviews(Title , Content, Date-time) values ('${title}' , '${content}' , '${curdatetime}')`;
    db.query(query , (error , result)=>{
        response.send(utils.createResult(error , result));
    });
})


app.put('/:id',(req,res)=>{

    const { id } = req.params
    const {title , content} = req.body

    const query = `update reviews set Content = '${content}' and Title = '${title}' WHERE id = '${id}'`;
    db.query(query , (error , result)=>{
        response.send(utils.createResult(error , result));
    });
})


app.listen(4000,'0.0.0.0',()=>{
    console.log('server started at port 4000');

})

