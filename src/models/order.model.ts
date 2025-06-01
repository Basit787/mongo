import { Document, model, Schema } from "mongoose";

interface IOrderProduct {
  product: Schema.Types.ObjectId;
  quantity: number;
}

interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  products: IOrderProduct[];
  totalPrice: number;
  status: "pending" | "shipped" | "delivered";
}

const orderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
});

const Order = model<IOrder>("Order", orderSchema);
export default Order;
