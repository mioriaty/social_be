import mongoose from 'mongoose';
import IUser from '~/modules/users/users.interface';
import type { Model } from 'mongoose';

export interface UsersDocument extends Document, IUser {}

const DOCUMENT_NAME = 'users';

const UsersSchema = new mongoose.Schema<UsersDocument>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel =
  (mongoose.models[DOCUMENT_NAME] as Model<UsersDocument>) ||
  mongoose.model<UsersDocument>(DOCUMENT_NAME, UsersSchema);

export default UserModel;
