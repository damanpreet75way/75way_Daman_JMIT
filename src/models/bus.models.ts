
import mongoose, { Schema ,Model} from "mongoose";
import { Bus } from "../core/types";


interface IBusMethods {
    // selectSeat(seatNumber:number): boolean
}

type BusModel = Model<Bus, {}, IBusMethods>;


const busSchema = new Schema<Bus,BusModel,IBusMethods>(
  {
    busNumber: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    seats: {
        type:[Boolean]
    },
    charges:{
        type:Number,
        required:true
    }
  },
  { timestamps: true }
);



export const BusModel = mongoose.model<Bus, BusModel>("Bus", busSchema);
