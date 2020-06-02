require('dotenv').config()

const express = require('express'),
    app = express(),
    session = require('express-session'),
    massive = require('massive'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
    authCtrl = require('../server/controllers/authController')

massive({
    connectionString: CONNECTION_STRING,
ssl:{rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
})


app.use(express.json())
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

app.post('/auth/register', authCtrl.register)

app.post('/auth/login', authCtrl.login)

app.listen(SERVER_PORT, console.log(`Server connected on ${SERVER_PORT}`))