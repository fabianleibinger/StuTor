import mongoose from "mongoose";
const { Schema } = mongoose;

const AchievementSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    required: true,
  },
});

const Achievement = mongoose.model("Achievement", AchievementSchema);

export default Achievement;
