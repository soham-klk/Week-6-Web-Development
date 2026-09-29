import mongoose, { Schema, Document } from 'mongoose';

// Define TypeScript interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
}

// Create Mongoose Schema for User
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Enforce unique constraint in MongoDB
      lowercase: true, // Automatically convert email to lowercase
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: [true, 'Password is required'],
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Export Mongoose User model (or existing model if compiled already)
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
