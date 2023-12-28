/* CONFIG DE SERVIDOR */

const express = require('express');
const { engine } = require ('express-handlebars');
const app = express();

const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const cookieParser = require('cookie-parser');

const dbConnection = require('./models/db')

const Data = require('./models/users')
const saveLogin = require('./models/saveLogin')
const SECRET_KEY = "ryanzinhodev"

app.use(express.json());

app.engine('handlebars', engine({defaultLayout: 'principal'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(cookieParser());


/* CONFIG DE SERVIDOR */




/* SISTEMA PARA MOSTRAR OS REGISTROS DE DETERMINADO USUÁRIO */

app.get("/show/:userId", async(req, res)=>{
    try{

        const user=await saveLogin.findAll({
            attributes: ['entrada', 'saida'],
            where: {
                UserId: req.params.userId
            }
        })
        res.json(user)

    }catch(error){
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

/* SISTEMA DE POST PARA LOGIN */

app.post("/loginPost", async(req,res)=>{
  
    try{

        const user=await Data.findOne({
            attributes: ['id', 'name', 'password', 'vefLogin'],
            where: {
                name: req.body.name,
                password: req.body.password
            }
        })
        
        
        
        if(user==null){
            res.status(400).json({ success: false, message: "Campos inválidos" });
            console.log("usuario não encontrado!")

        }else{
            if(user.vefLogin==true){
                res.status(409).json({ success: false, message: "Usuário já está logado!" });
                console.log("Usuário já está logado!")
            }else{
                const data = await Data.update(
                    {vefLogin: true},
                    { where: { id: user.id} })
                const token = jwt.sign({ userId: user.id }, SECRET_KEY, {expiresIn: '7d'});
                res.setHeader('Set-Cookie', cookie.serialize('token', token, { httpOnly: true }));
    
              
               res.json({ auth: true, success: true, token});
            }  
        }
      
    }catch(error){
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

/* FUNÇÃO PARA DISPONIBILIZAÇÃO DE TOKENS */

function vefJWT(req, res, next){
    const token = req.cookies.token

    if (token) {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            if(err.name === 'TokenExpiredError'){
                res.redirect('/logout');
            }
       
        } else {
          req.userId=decoded.userId
          req.vefLogin=decoded.vefLogin
          next()
         
            }
      });
    } else {
        res.clearCookie('token'); 
        res.redirect('/logout');
    
    }
}


/* SISTEMA DE REGISTRO DE ENTRADA */

app.get("/menu",vefJWT, function(req,res){
    const entrada = new Date()
    const SaveLogin = saveLogin.create({
      UserId: req.userId,
        entrada: entrada,
         saida: null
       
    })
    res.render('menu', { userId: req.userId });
   
  });

  /* SISTEMA DE LOGOUT */

app.get("/logout", vefJWT, async(req, res)=>{
    if(req.vefLogin==false){
        console.log("Usuário não deu entrada!")
    }else{

    const data = await Data.update(
        {vefLogin: false},
        { where: { id: req.userId} })

    const saida= new Date()
    const SaveLogin = await saveLogin.update(
     {saida: saida},
     { where: { UserId: req.userId, saida: null} })

    res.clearCookie('token')
    res.redirect('/login')

    }
    
   /* MOSTRAR PÁGINA DE CADASTRO */ 
})
app.get("/cadastro", function(req, res ) {
   res.render('inicio');
})


/*        DIRECIONAMENTO DE ARQUIVOS JS E CSS           */

app.get("/public/javascript.js", function(req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/public/javascript.js');
})
app.get("/login", function(req, res ) {
    res.render('login');
 })
app.get("/public/javascriptoLogin.js", function(req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/public/javascriptoLogin.js');
})
app.get("/public/menujs.js", function(req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/public/menujs.js');
})
app.get("/public/styles.css", function(req, res){
    res.setHeader('Content-Type', 'text/css'); 
    res.sendFile(__dirname + '/public/styles.css'); 
})

/*        DIRECIONAMENTO DE ARQUIVOS JS E CSS           */


/* SISTEMA DE POST PARA CADASTRO */

app.post("/post", async(req,res)=>{
    
    try{
        const user=await Data.findOne({
            attributes: ['name', 'password', 'vefLogin'],
            where: {
                name: req.body.name,
                password: req.body.password,
                vefLogin: false
            }
        })
        if(user){
            res.status(409).json({ success: false, message: "Usuário já cadastrado" });
        }else{
            const { name,password } = req.body    
         
            res.json(await Data.create({name,password}))
        }
        
       
    }catch(error){
        console.log(error)
        res.status(500).send("Internal server erro")
    }
})


/* INICIAR O SERVIDOR */
app.listen(7070, () =>{
    console.log("Servidor iniciado com sucesso!")
})

