const express =require('express')
const app=express()
const bodyParser=require('body-parser')
const mysql=require('mysql2')


app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'sanjaysanthosh@2003',
    database:'db'    
})


con.connect(function(err){
    if(err) throw err;
    console.log("Database connected");
})
app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/create',(req,res)=>{
    res.render('create');
})

app.get('/delete',(req,res)=>{
    res.render('delete')
})

app.get('/read',(req,res)=>{
    con.query('SELECT * from demo',(err,result)=>{
        if(err) throw err;
    res.render('read',{data:result})
    })
    
})

app.get('/update',(req,res)=>{
    res.render('update')
})

app.post('/create',(req,res)=>{
    const id =req.body.id;
    const name=req.body.name;
    const c=req.body.class;
    const age=req.body.age;

    con.query('INSERT INTO demo(id,name,class,age) VALUES(?,?,?,?)',[id,name,c,age],(err,result)=>{
        if(err) throw err;
        res.redirect('/')
    })
})

app.post('/update',(req,res)=>{
    const id =req.body.id;
    const name=req.body.name;
    const c=req.body.class;
    const age=req.body.age;

    con.query('UPDATE demo SET name =?,class=?, age=? WHERE id=?',[name,c,age,id],(err,result)=>{
        if(err) throw err;
        res.redirect('/')
    })
})

app.post('/delete',(req,res)=>{
    const id =req.body.id;


    con.query('DELETE FROM  demo where id=?',[id],(err,result)=>{
        if(err) throw err;
        res.redirect('/')
    })
})



app.listen(3000,()=>{
    console.log("Sever listening on port 3000");
})


