import mongoose from "mongoose";
const { Schema } = mongoose;

const UserStudysessionSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  studysession: {
    type: Schema.Types.ObjectId,
    ref: "Studysession",
    required: true,
  },
});

const UserStudysession = mongoose.model(
  "UserStudysession",
  UserStudysessionSchema
);

export default UserStudysession;
