const express=require('express');
const app=express();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

var arr=[
    {
        id : uuidv4(),
        txt :"paneer",
        date : "2026-06-01"
    }
];

app.set('view engine','ejs')
 
app.get('/',function(req,res){
    res.render('main',{
        data:arr
    });
})

app.post('/',function(req,res){
    
    var obj={
        id : uuidv4(),
        txt : req.body.hisaabtext,
        date : new Date().toLocaleDateString('en-CA')
    }
    
    arr.push(obj);
    
    
    console.log(arr);
    console.log(obj);
    console.log(req.query.hisaabtext);
    
    res.render('main',{
        data : arr
    });
})



app.get('/create',function(req,res){
    res.render('create');
})

// app.get('/edit/:id',function(req,res){
//     res.render('main');
// })
 
app.post('/delete/:id', function(req, res) {
    const id = req.params.id;
    arr = arr.filter(item => item.id !== id);
    res.redirect('/');
});

app.get('/view/:id',function(req,res){
     const id = req.params.id;
     const entry = arr.find(item => item.id === id);
     res.render('view',{
        single:entry
     })
})

app.post('/edit/:id', function(req, res) {
    const id = req.params.id;
    const entry = arr.find(item => item.id === id);
    arr = arr.filter(item => item.id !== id);
    console.log(entry);
    res.render('edit', { entry });
});

app.listen(8000,function(req,res){
    console.log('server is live at port 8000')
})