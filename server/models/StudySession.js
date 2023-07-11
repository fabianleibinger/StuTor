import mongoose from 'mongoose';
const { Schema } = mongoose;

const StudysessionSchema = new mongoose.Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: false,
    },
    courseName: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    tutoredBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pricePerHourEuro: {
        type: Number,
        required: true,
    },
    languages: {
        type: Array,
        item: {
            type: String,
            enum: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Arabic', 'Hindi', 'Bengali', 'Punjabi', 'Turkish', 'Urdu', 'Other'],
        },
        default: ['English'],
        required: true,
    },
});

const Studysession = mongoose.model('Studysession', StudysessionSchema);

export default Studysession;