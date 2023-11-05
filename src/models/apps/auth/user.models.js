import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import { USER_TOKEN_EXPIRY } from "../../../constants.js";
const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://via.placeholder.com/200x200.png`,
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // allows you to specify that an index should be created for a particular field in your MongoDB collection. improved query performance when searching or sorting documents based on that field.
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true, //This will remove leading and trailing whitespace from the 'email' field.
    },
    // role:{
    //     type:String,
    //     required:true,
    // },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);
//!The timestamps option is one of these schema-level options, and it is used to automatically add "createdAt" and "updatedAt" fields to your documents. These fields will be automatically updated by Mongoose whenever a document is created or updated. It's clear that these options apply globally to the entire document, and Mongoose can interpret and process them correctly.

userSchema.methods.generateToken = function () {
  const hashedToken = crypto.createHash("sha256").digest("hex");
  const tokenExpiry = Date.now() + USER_TOKEN_EXPIRY;

  return { hashedToken, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);
