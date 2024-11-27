import supabase from "./db";

interface User {
	firstname: string;
	lastname: string;
	username: string;
	email: string;
	password: string;
}

class User {
	static createNewUser: (
		newUser: User
	) => void;
	static checkUserInDb: (
		email: string,
	) => Promise<boolean>;
	static getStoredPassword : (
		userEmail: string
	) => Promise<string>;
	static getIdFromEmail : (
		userEmail: string
	) => Promise<number>;

	constructor(user: any) {
		this.firstname = user.firstname;
		this.lastname = user.lastname;
		this.username = user.username;
		this.email = user.email;
		this.password = user.password;
	}
}

User.createNewUser = async (
	newUser: User
	) => {
		const { data, error } = await supabase
		.from('users')
		.insert([newUser])
		.select()
	if (error) throw new Error(error.message)
	return await data
}

User.checkUserInDb = async (email: string): Promise<boolean> => {
	const { data, error } = await supabase
		.from('users')
		.select(`*`)
		.eq('email', email)
		.single()
	if (data === null) {
		return true
	} else {
		return false
	}
}

User.getStoredPassword = async (userEmail: string): Promise<string> => {
	const { data, error } = await supabase
		.from('users')
		.select(`password`)
		.eq('email', userEmail)
		.single()

	if (error) throw new Error(error.message)
	return data.password
}

User.getIdFromEmail = async (userEmail: string): Promise<number> => {
	const { data, error } = await supabase	
		.from('users')
		.select('id')
		.eq('email', userEmail)
		.single()

	if (error) throw new Error(error.message)
	return data.id
}


export default User;
