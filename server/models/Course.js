import mongoose from 'mongoose';
const { Schema } = mongoose;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    external_identifier: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    university: {
        type: Schema.Types.ObjectId,
        ref: 'University',
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    professor: {
        type: String,
        required: true,
    },
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;