import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model";
import { log } from "console";

const queries = require("../models/queries");


// create a new user, checking first if he already exists in db
// return a token 
const postNewUser = (req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}
	const newUser = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});
	User.checkUser(newUser.username, newUser.email, (checkUserErr, checkUserData) => {
		if (checkUserErr) {
			res.status(409);
			console.log('COUCOU y a une erreur')
		} else {
			User.postNewUser(newUser, (newUserErr, newUserData) => {
				console.log(newUserData)
				if (newUserErr) {
					res.status(500).send({
						message:
							newUserErr.message ||
							"Some error occured while creating a new user.",
					});
				}
				res.send(JSON.stringify(generateToken(newUser.email)));
			});
		}
	});
};

// generate a new token associated to a username
const generateToken = (userEmail: string | string[]) => {
	dotenv.config();
	const token = jwt.sign(
		{ email: userEmail },
		process.env.TOKEN_SECRET as string,
		{ expiresIn: "2 days" }
	);
	return token;
};

// wip - should check token/user relation validity 
const login = (req: Request, res: Response) => {
	if (req.headers.email == undefined) { 
		console.error("Pas d'email")
	} else { 
		const email = req.headers.email
		console.log('EMAIL', email)
		User.login(email, (err, data) => { 
			if (err) {
      console.error('Erreur lors du login:', err);
      res.status(500).json({ error: "Erreur lors du login" });
      return;
    }

    if (!data || data.length === 0) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }
		const user = data[0];
		res.send(JSON.stringify(user.password))
	})
	}
	console.log(req.headers)
};

const returnToken = (req: Request, res: Response) => { 
	if (req.headers.email == undefined) { 
		console.error("Pas d'email")
	} else { 
		const email = req.headers.email
		console.log('EMAIL', email)
		res.send(JSON.stringify(generateToken(email)));
		}
}

exports.login = login;
exports.returnToken = returnToken;
exports.postNewUser = postNewUser;
