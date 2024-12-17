import { Schema,model } from "mongoose";

const ProductSchema = new Schema({
    id:{
        type:Number,
        required:true,
        trim:true,
        unique:true
    },
    product_name:{
        type:String,
        required:true,
        trim:true
    },
    measure:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    stock:{
        type:Number,
        required:true,
        trim:true
    },
    imgUrl:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
})

export default model('Products',ProductSchema)

