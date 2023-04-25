import { User } from "../models/user.model.js"
import bcrypt from "../libs/bcrypt.js"
import jwt from '../libs/jwt.js'

const login = async (email, password) =>{
    const userFound = await User.findOne({ email })

    if(!userFound) throw new Error('Invalid credentials')

    const isValidPassword = await bcrypt.compare(password, userFound.password)

    if(!isValidPassword) throw new Error('Invalid credentials')

    //Generar el token
    return jwt.sign({ id: userFound._id })
}

export { login }