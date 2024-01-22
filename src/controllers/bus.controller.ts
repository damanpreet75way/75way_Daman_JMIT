import { BusModel } from '../models/bus.models'
import { ApiError } from '../utils/ApiError'
import { ApiResponse } from '../utils/ApiResponse'
import { asyncHandler } from '../utils/asyncHandler'
import { UserRolesEnum } from '../constants'
import mongoose from 'mongoose'



const getBus = asyncHandler(async(req,res)=>{
  const {  busNumber } = req.params;

  const bus = await BusModel.findOne({
          $or: [{ busNumber }],
       });
   if (!bus) {
          throw new ApiError(409, "incorrect bus number");
        }


  return res
  .status(201)
  .json(
    new ApiResponse(
      200,
      {bus},
      "Bus Detail"
    )
  );
      
})

const addBus = asyncHandler(async(req,res)=>{
    const {  busNumber, totalSeats,charges } = req.body;

    const existedBus = await BusModel.findOne({
            $or: [{ busNumber }],
         });
     if (existedBus) {
            throw new ApiError(409, "Bus already exist");
          }
    const bus = await BusModel.create({
            busNumber,
            totalSeats,
            seats:new Array(totalSeats).fill(true),
            charges
          });

    await bus.save();

   const createdBus = await BusModel.findById(bus._id)
    return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { createdBus},
        "Seat booked successfully "
      )
    );
        
  })


const bookSeat = asyncHandler(async(req,res)=>{
  const {  busNumber, seatNumber } = req.body;

  const existedBus = await BusModel.findOne({
          $or: [{ busNumber }],
       });
   if (!existedBus) {
          throw new ApiError(409, "bus not found " );
        }
  const bus = await BusModel.findOne({
    $or: [{ busNumber }],
  }); 

  bus!.seats[seatNumber-1] = false
  await bus!.save();
  const createdBus = await BusModel.findById(bus!._id).select(
      ""
    );
  return res
  .status(201)
  .json(
    new ApiResponse(
      200,
      { bus: createdBus },
      "Bus created  successfully "
    )
  );
      
})





export {addBus,bookSeat,getBus}