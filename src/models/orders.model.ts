import { Document, model, Schema } from "mongoose";

interface Products {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  products: Products[];
  totalPrice: number;
  status: "pending" | "shipped" | "delivered";
}

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
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
  },
  { timestamps: true },
);

const Order = model<IOrder>("Order", OrderSchema);

export default Order;
