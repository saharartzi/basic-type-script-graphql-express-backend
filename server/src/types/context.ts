import {Request, Response} from 'express'
import { User } from '../schema/user.shcema'

interface Context {
    req:Request
    res:Response
    user:User | null
}

export default Context