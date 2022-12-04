import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  username: String,
  password: String,
  services: [
    {
      id: Number,
      token: String,
      refreshToken: String,
    },
  ],
});

export const AreaSchema = new Schema({
  name: String,
  userId: String,
  interval: Number,
  on: Boolean,
  actions: [
    {
      id: Number,
      serviceId: Number,
      param: [String],
    },
  ],
  reactions: [
    {
      id: Number,
      serviceId: Number,
      param: [String],
    },
  ],
});

export const UserModel = mongoose.model("UserModel", UserSchema);
export const AreaModel = mongoose.model("AreaModel", AreaSchema);
