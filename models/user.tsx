import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  image: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: [true, "email is required"],
  },
  name: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 50, // This should be 50 as per your requirements
    match: /^[a-zA-Z0-9\s]*$/,
    unique: true,
  },
  image: {
    type: String,
  },
});

//the models object used down below is provided by the Mongoose library and stores all the registered models.
//if a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable

//if a model name "User" does not exist in the "models" object, the "model" function from mongoose is called to create a new model
// the newly created model ts then assigned to the "User" variable

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
