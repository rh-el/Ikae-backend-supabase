import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import bcrypt from "bcryptjs";


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
	return jwt.sign({ email }, process.env.TOKEN_SECRET as string, { expiresIn: "2days"})
}

const getHashedPassword = (password: string) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

const login = async (req: Request, res: Response) => {
	try {
		
		const email = validateHeader(req.headers.email, "email")
		const password = validateHeader(req.headers.password, 'password')

		const storedPassword: string = await User.getStoredPassword(email)
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

  
const register = async (req: Request, res: Response) => {
	try {

		const firstname = validateHeader(req.body.firstname, 'firstname')
		const lastname = validateHeader(req.body.lastname, 'lastname')
		const username = validateHeader(req.body.username, 'username')
		const email = validateHeader(req.body.email, "email")
		const password = validateHeader(req.body.password, "password")
		
		const isUserInexistant = await User.checkUserInDb(email)

		if (isUserInexistant) {

			const hashPassword = getHashedPassword(password)

			const newUser = new User({
				firstname: firstname,
				lastname: lastname,
				username: username,
				email: email,
				password: hashPassword
			});

			User.createNewUser(newUser)
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


exports.login = login;
exports.register = register