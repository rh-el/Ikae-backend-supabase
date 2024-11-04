const mysql = require("mysql2");
import dbConfig from "../config/db.config";
import { ErrorRequestHandler } from "express";

// creates db connection
const connection = mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password, 
    database: dbConfig.database
});

// opens the connection
connection.connect((error: ErrorRequestHandler) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// exports db connection to other file using import connection from "../db.ts"
export default connection