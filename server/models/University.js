import mongoose from "mongoose";
const { Schema } = mongoose;

const UniversitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    enum: [
      "Italy",
      "Spain",
      "France",
      "Germany",
      "United Kingdom",
      "United States",
      "Canada",
      "Australia",
      "New Zealand",
      "China",
      "Japan",
      "South Korea",
      "Russia",
      "Brazil",
      "Argentina",
      "Mexico",
      "Chile",
      "Colombia",
      "Peru",
      "India",
      "South Africa",
      "Egypt",
      "Kenya",
      "Nigeria",
      "Ghana",
      "Morocco",
      "Tunisia",
      "Algeria",
      "Other",
    ],
    required: true,
  },
});

const University = mongoose.model("University", UniversitySchema);

export default University;
