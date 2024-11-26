import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import User from "../models/user.model";
import { log } from "console";
import supabase from "../models/db";
import bcrypt from "bcryptjs";




// create a new user, checking first if he already exists in db
// return a token 
// const postNewUser = (req: Request, res: Response) => {
// 	if (!req.body) {
// 		res.status(400).send({
// 			message: "Content can not be empty!",
// 		});
// 	}
// 	const newUser = new User({
// 		firstname: req.body.firstname,
// 		lastname: req.body.lastname,
// 		username: req.body.username,
// 		email: req.body.email,
// 		password: req.body.password
// 	});
// 	User.checkUser(newUser.username, newUser.email, (checkUserErr, checkUserData) => {
// 		if (checkUserErr) {
// 			res.status(409);
// 			console.log('COUCOU y a une erreur')
// 		} else {
// 			User.postNewUser(newUser, (newUserErr, newUserData) => {
// 				console.log(newUserData)
// 				if (newUserErr) {
// 					res.status(500).send({
// 						message:
// 							newUserErr.message ||
// 							"Some error occured while creating a new user.",
// 					});
// 				}
// 				res.send(JSON.stringify(generateToken(newUser.email)));
// 			});
// 		}
// 	});
// };



// generate a new token associated to a username
// const generateToken = (userEmail: string | string[]) => {
// 	dotenv.config();
// 	const token = jwt.sign(
// 		{ email: userEmail },
// 		process.env.TOKEN_SECRET as string,
// 		{ expiresIn: "2 days" }
// 	);
// 	return token;
// };

// wip - should check token/user relation validity 
// const login = (req: Request, res: Response) => {
// 	if (req.headers.email == undefined) { 
// 		console.error("Pas d'email")
// 	} else { 
// 		const email = req.headers.email
// 		console.log('EMAIL', email)
// 		User.login(email, (err, data) => { 
// 			if (err) {
//       console.error('Erreur lors du login:', err);
//       res.status(500).json({ error: "Erreur lors du login" });
//       return;
//     }

//     if (!data || data.length === 0) {
//       res.status(404).json({ error: "Utilisateur non trouvé" });
//       return;
//     }
// 		const user = data[0];
// 		res.send(JSON.stringify(user.password))
// 	})
// 	}
// 	console.log(req.headers)
// };

const getStoredPassword = async (userEmail: string): Promise<string> => {
		const { data, error } = await supabase
		.from('users')
		.select(`password`)
		.eq('email', userEmail)
		.single()

		if (error) throw new Error(error.message)
		return data.password
}

const comparePasswords = async (userPassword: string, hashedPassword: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(userPassword, hashedPassword, (err: any, result: any) => {
			if (err) {
				reject(err)
			} else {			
				resolve(result)
			}
		})
	})
}

const validateHeader = (header: any, fieldName: string): string => {
    if (!header) {
        throw new Error(`No ${fieldName} provided in headers`);
    }
    return Array.isArray(header) ? header[0] : header;
};

const generateAuthToken = (email: string): string => {
	dotenv.config()
	return jwt.sign({ email }, process.env.TOKEN_SECRET as string, { expiresIn: "2days"})
}

const login = async (req: Request, res: Response) => {
	try {
		// check for headers, returns their value if present
		const email = validateHeader(req.headers.email, "email")
		const password = validateHeader(req.headers.password, 'password')

		const storedPassword: string = await getStoredPassword(email)

		const isPasswordCorrect = await comparePasswords(password, storedPassword)

		if (isPasswordCorrect) {

			const authToken = generateAuthToken(email)

			return res.status(200).json({
				message: "Login successful",
				token: authToken
			})
		} else {
			return res.status(401).json({ error: 'Invalid credentials '})
		}
	} catch (error: any) {
		console.error("Login error:", error)

		return res.status(500).json({
			error: error.message || 'an unexpected error occured during login'
		})
	}		
}

const checkUserInDb = async (email: string): Promise<boolean> => {
	const { data, error } = await supabase
		.from('users')
		.select(`*`)
		.eq('email', email)
		.single()
		return data === null ? true : false
}

const createNewUser = async (firstname: string, lastname: string, username: string, email: string, password: string) => {
	const { data, error } = await supabase
		.from('users')
		.insert([
			{
				firstname: firstname,
				lastname: lastname,
				username: username,
				email: email,
				password: password
			}
		])
		.select()
	if (error) throw new Error(error.message)
	return data
}

const getHashedPassword = (password: string) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
  };
  

const register = async (req: Request, res: Response) => {
	try {

		const firstname = validateHeader(req.body.firstname, 'firstname')
		const lastname = validateHeader(req.body.lastname, 'lastname')
		const username = validateHeader(req.body.username, 'username')
		const email = validateHeader(req.body.email, "email")
		const password = validateHeader(req.body.password, "password")
		
		const isUserInexistant = await checkUserInDb(email)
		if (isUserInexistant) {

			const hashPassword = getHashedPassword(password)

			const newUser = await createNewUser(firstname, lastname, username, email, hashPassword)

			console.log('new user:', newUser)

			const authToken = generateAuthToken(email)

			return res.status(200).json({
				message: `User ${username} successfully registered`,
				token: authToken
			})

		} else {
			return res.status(401).json({ error: 'User already exists in db'})
		}
	} catch (error: any) {
		console.error("Registration error:", error)

		return res.status(500).json({
			error: error.message || 'an unexpected error occured during registration'
		})
	}

}

// const login = async (req: Request, res: Response) => {
// 	let { data, error } = await supabase
// 	.from('users')
// 	.select('*')
	
// 	if (error) return res.status(500).json({ error: error.message })
// 	res.json(data)
// }

// const returnToken = (req: Request, res: Response) => { 
// 	if (req.headers.email == undefined) { 
// 		console.error("Pas d'email")
// 	} else { 
// 		const email = req.headers.email
// 		console.log('EMAIL', email)
// 		res.send(JSON.stringify(generateToken(email)));
// 		}
// }

exports.login = login;
exports.register = register
// exports.returnToken = returnToken;
// exports.postNewUser = postNewUser;
