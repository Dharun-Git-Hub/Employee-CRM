const mysql2 = require('mysql2/promise')
require('dotenv').config()

let db;
let connection;

(
    async()=>{
        try{
            db = await mysql2.createConnection({
                host: process.env.host,
                user: process.env.user,
                password: process.env.pass
            })
            await db.query('create database if not exists employee')
            console.log('Database Created / Initiated')
            connection = await mysql2.createConnection({
                host: 'localhost',
                user: process.env.user,
                password: process.env.pass,
                database: 'employee'
            }) 
            await connection.query(`create table if not exists crm (name varchar(100) not null, id varchar(50) not null, department varchar(100) not null, designation varchar(100) not null, project varchar(100) default null, status enum ('Assigned', 'On-The-Go', 'Done') not null default 'Assigned', type varchar(100) not null, dp longblob default null, primary key (id))`)
            await connection.query(`create table if not exists users (username varchar(100) not null unique, password varchar(300) not null, primary key (username))`)
            await connection.query(`create table if not exists logs (gmail varchar(200) not null unique, name varchar(200) default 'Unknown', checked_at timestamp default current_timestamp)`)
            console.log('Tables Created / Initiated')
        }
        catch(err){
            console.log(err)
            console.log('Database not connected! (Middleware Error)')
        }
    }
)()

module.exports = (req,res,next) => {
    if(!db)
        return res.status(500)
    req.db = connection
    next()
}