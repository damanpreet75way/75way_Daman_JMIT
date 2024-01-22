import { UserRolesEnum } from "./../constants"

import mongoose from 'mongoose'



export interface   User   {
    username:string,
    refreshToken:string,
    role:UserRolesEnum.ADMIN| UserRolesEnum.USER,
    _id: mongoose.Types.ObjectId;      
    password:string
}

export interface Bus {
    busNumber:string,
    totalSeats:number,
    seats:boolean[] //true map to vacant seat,
    charges:number
}

export interface Discount {
    discountCode:string,
    price:number,
    maxUser:number
}