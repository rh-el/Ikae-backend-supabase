// const mysql = require("mysql2");
// import { ErrorRequestHandler } from "express";
import dotenv from 'dotenv'

// get .env config, stored natively in process.env
dotenv.config();



// // creates db connection
// const connection = mysql.createConnection({
// 	host: process.env.HOST,
// 	port: process.env.PORT,
// 	user: process.env.LOGIN,
// 	password: process.env.PASSWORD,
// 	database: process.env.DATABASE,
// });


// // opens the connection
// connection.connect((error: ErrorRequestHandler) => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

// exports db connection to other file using import connection from "../db.ts"
// export default connection


const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANONKEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase