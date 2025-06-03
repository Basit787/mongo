import { Document, model, Model, Schema } from "mongoose";

interface IProduct extends Document {
  name: String;
  description: String;
  price: Number;
  stock: Number;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Product = model<IProduct>("Product", ProductSchema);

export default Product;
