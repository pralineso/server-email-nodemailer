const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())


app.get('/', (req, res) =>{
    res.json({
        message: 'Mailer Application 😎'
    });
    if (err) {
        res.status(500).json({ message: 'Internal Error'});
    }
});


app.post('/email', (req, res) => {

    const { email,name, tel, city, state, mensagem } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    
    const mail = process.env.EMAIL;
    
    var text = '<h3> Mensagem recebida !!!</h3>'+
               '<p><b>Nome: </b>'+ name +'</p>'+
               '<p><b>Email: </b>'+ email +'</p>'+
               '<p><b>Telefone: </b>'+ tel +'</p>'+
               '<p><b>Cidade: </b>'+ city +'</p>'+
               '<p><b>Estado: </b>'+ state +'</p>'+
               '<p><b>Mensagem: </b>'+ mensagem +'</p>';
    
    const mailOptions = {
        from: mail,
        to: mail,
        subject: 'Nova mensagem do site de '+name,
        html: text
    };
    
    console.log(mailOptions);
    
        
    transporter.sendMail(
        mailOptions
    ).then(info => {
        res.send(info);
    }).catch(error => {
        res.send(error);
    });
    

});

app.listen(port, () => console.log(`Server is starting on PORT  ${port}`));