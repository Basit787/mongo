import { Document, model, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: String;
  age: Number;
  email: String;
  password: String;
  role: "admin" | "customer";
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
  },
});

const User = model<IUser>("User", UserSchema);

export default User;
