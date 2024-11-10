import connection from "./db";
const queries = require("../models/queries");

interface User {
	firstname: string;
	lastname: string;
	username: string;
	email: string;
	password: string;
}

class User {
	static postNewUser: (
		newUser: User,
		result: (err: Error | null, data: User | null) => void
	) => void;
	static checkUser: (
		username: string,
		email: string,
		result: (err: Error | null, data: User | null) => void
	) => void;

	constructor(user: any) {
		this.firstname = user.firstname;
		this.lastname = user.lastname;
		this.username = user.username;
		this.email = user.email;
		this.password = user.password;
	}
}

// creates a new user
User.postNewUser = (
	newUser: User,
	result: (err: Error | null, data: User | null) => void
) => {
	const query = queries.postNewUserQuery();

	connection.query(
		query,
		[
			newUser.firstname,
			newUser.lastname,
			newUser.username,
			newUser.email,
			newUser.password,
		],
		(err: Error, res: User) => {
			// error handler
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}
			// returns query result
			console.log("✅ user: ", res);
			result(null, res);
		}
	);
};

// check if user already exists - based on email and username
User.checkUser = (
	username: string,
	email: string,
	result: (err: Error | null, data: User | null) => void
) => {
	const query = queries.checkUserQuery(username, email);

	connection.query(query, [username, email], (err: Error, res: any) => {
		// error handler
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		// returns query result
		console.log(err);
		console.log(res);
		result(null, res);
	});
};

export default User;
