const mysql = require("mysql2");
import { ErrorRequestHandler } from "express";
import dotenv from 'dotenv'

dotenv.config();
console.log(process.env.USERNAME)
console.log(process.env.DATABASE);

// creates db connection
const connection = mysql.createConnection({
	host: process.env.HOST,
	port: process.env.PORT,
	user: process.env.USERNAME,
	password: "",
	database: process.env.DATABASE,
});

// opens the connection
connection.connect((error: ErrorRequestHandler) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// exports db connection to other file using import connection from "../db.ts"
export default connection