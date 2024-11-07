import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model";

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

	User.postNewUser(newUser, (err, data) => {
		// if (err) {
		// 	res.status(500).send({
		// 		message: err.message || "Some error occured while creating a new user.",
		// 	});
		// } else {
		// 	res.send(
		// 		"Félicitations ! Une nouvelle utilisatrice a bien été enregistrée"
		// 	);
		// }
	});
};

const getTest = (req: Request, res: Response) => {
	res.send("Vous êtes authentifiée.");
};

const postToken = (req: Request, res: Response) => {
	dotenv.config();
	// vérifier que l'utilisateur existe
	// s'il existe :
	const username = req.body.username;
	const token = jwt.sign(
		{ username: username },
		process.env.TOKEN_SECRET as string,
		{ expiresIn: "2 days" }
	);

	res.json(token);
	// else :
	// res.status(403)
};

exports.getTest = getTest;
exports.postToken = postToken;
exports.postNewUser = postNewUser;
