import { DiscountModel } from '../models/discount.model'
import { ApiError } from '../utils/ApiError'
import { ApiResponse } from '../utils/ApiResponse'
import { asyncHandler } from '../utils/asyncHandler'
import { UserRolesEnum } from '../constants'
import mongoose from 'mongoose'


const createDiscount = asyncHandler(async(req,res)=>{
    console.log('create discount is called ')
    const {  discountCode,price,maxUser} = req.body;

    const exostedCard = await DiscountModel.findOne({
            $or: [{ discountCode }],
         });
     if (exostedCard) {
            throw new ApiError(409, "discount coupon  already exist");
          }
    const discount = await DiscountModel.create({
            discountCode,
            price,
            maxUser
          });

    await discount.save();

   const createdDiscount = await DiscountModel.findById(discount._id)
    return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { createdDiscount},
        "Discount card created successfully "
      )
    );
        
  })



export {createDiscount}