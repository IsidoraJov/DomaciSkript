const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const Joi = require('joi');

const app = express()



app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
 


const pool  = mysql.createPool({
    connectionLimit : 100,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'skript',
    logging         : false
})

const sema = Joi.object().keys({
    naziv: Joi.string().trim().min(4).max(100).required(),
    komentar: Joi.string().max(1000).required()
});

//prikaz svih usera
app.get('/listUsers', (req,res) =>{
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query('SELECT * FROM app_user', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.status(500).send(err.sqlMessage); 
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from app_user table are: \n', rows)
        })
    })
})

//dodavanje usera
app.post('/addUser', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO app_user SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`User with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
       
        })
    })
});

//brisanje usera
app.delete('/deleteUser/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM app_user WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`User with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from user table are: \n', rows)
        })
    })
});

// Update a record / user
app.put('/updateUser', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, username, password, email, broj_telefona, steceno_obrazovanje,id_radno_mesto} = req.body

        connection.query('UPDATE app_user SET username = ?, password = ?, email = ?, broj_telefona = ?, steceno_obrazovanje = ?, id_radno_mesto = ?', [username, password, email,broj_telefona, steceno_obrazovanje, id_radno_mesto] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`User with the name: ${username} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})

//prikaz dostupnih kurseva
app.get('/listKursevi', (req,res) =>{
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query('SELECT * FROM dostuni_kursevi', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.status(500).send(err.sqlMessage); 
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from dostuni_kursevi table are: \n', rows)
        })
    })
})

//dodavanje usera
app.post('/addKurs', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO dostuni_kursevi SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Kurs with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
       
        })
    })
});

//brisanje usera
app.delete('/deleteKurs/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM dostuni_kursevi WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`kurs with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from kurs table are: \n', rows)
        })
    })
});

// Update a record / user
app.put('/updateKurs', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, naziv, trajanje, uslov_polaganja} = req.body

        connection.query('UPDATE app_user SET naziv = ?, trajanje = ?, uslov_polaganja = ?', [naziv, trajanje, uslov_polaganja] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`User with the name: ${naziv} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})

app.get('/listRadnaMesta', (req,res) =>{
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query('SELECT * FROM radna mesta', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.status(500).send(err.sqlMessage); 
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from app_user table are: \n', rows)
        })
    })
})

//dodavanje usera
app.post('/addUser', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO radna mesta SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`User with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
       
        })
    })
});

//brisanje usera
app.delete('/deleteUser/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM radna mesta WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`User with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from user table are: \n', rows)
        })
    })
});

// Update a record / user
app.put('/updateUser', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, username, password, email, broj_telefona, steceno_obrazovanje,id_radno_mesto} = req.body

        connection.query('UPDATE radna mesta SET username = ?, password = ?, email = ?, broj_telefona = ?, steceno_obrazovanje = ?, id_radno_mesto = ?', [username, password, email,broj_telefona, steceno_obrazovanje, id_radno_mesto] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`User with the name: ${username} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})




app.listen(8080)