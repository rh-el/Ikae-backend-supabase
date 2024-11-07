import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model";

// Création d'un nouvel utilisateur
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
		password: req.body.password,
	});
	User.checkUser(newUser.username, newUser.email, (checkUserErr, checkUserData) => {
		if (checkUserErr) {
			res.status(409);
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
				res.send(generateToken(newUser.username));
			});
		}
	});
};

const generateToken = (username: string) => {
	dotenv.config();
	const token = jwt.sign(
		{ username: username },
		process.env.TOKEN_SECRET as string,
		{ expiresIn: "2 days" }
	);
	return token;
};

// Récupération du token de l'utilisateur pour le login
const getTest = (req: Request, res: Response) => {
	res.send("Vous êtes authentifiée.");
};

exports.getTest = getTest;
exports.postNewUser = postNewUser;
