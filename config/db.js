import mysql from 'mysql';

export const db = mysql.createPool({
    connectionLimit:100,
    host:"localhost",
    user:"root",
    password:"pallavi20!@#",
    database:"tasks"
})