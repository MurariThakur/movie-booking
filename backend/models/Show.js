import mongoose from "mongoose";

const ShowSchema = new mongoose.Schema({

    movie:{type:Number,required:true,ref:"Movie"},
    showDateTime:{type:Date,required:true},
    showPrice:{type:Number,required:true},
    occupiedSeats:{type:Object , default:{}},
},{
    timestamps:true,
    minimize:false,
})

const Show = mongoose.model("Show",ShowSchema)
export default Show;