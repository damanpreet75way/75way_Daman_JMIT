
import mongoose, { Schema ,Model} from "mongoose";
import { Discount } from "../core/types";


interface IDiscountMethods {
}

type DiscountModel = Model<Discount, {}, IDiscountMethods>;


const discountSchema = new Schema<Discount,DiscountModel,IDiscountMethods>(
  {
    discountCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxUser:{
      type:Number,
      required:true
    }
    
  },
  { timestamps: true }
);



export const DiscountModel = mongoose.model<Discount,DiscountModel>("Discount", discountSchema);







