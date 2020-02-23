const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretJwtKey } = require("../config/config");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },
  password: {
    type: String,
    required: true
  },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free"
  },
  token: {
    type: String,
    default: null
  }
});

userSchema.methods.getPublicFields = function() {
  return {
    token: this.token,
    user: {
      email: this.email,
      subscription: this.subscription
    }
  };
};

userSchema.pre("save", function(next) {
  const user = this;

  if (
    (user.password && this.isModified("password")) ||
    (user.password && this.isNew)
  )
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        return next();
      });
    });

  return next();
});

userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compareSync(password, this.password);
};

userSchema.methods.getJWT = function() {
  const preToken = jwt.sign(
    {
      id: this._id
    },
    secretJwtKey
  );

  const token = preToken;

  this.token = token;
  this.save();
  return token;
};

userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
