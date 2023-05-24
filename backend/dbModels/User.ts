const { Schema, model } = require("../config/db"); // import Schema & model

// User Schema
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  address: { type: String },
});

// User model
const User = model("User", UserSchema);

export default User;
