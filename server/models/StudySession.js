import Schema from "mongoose";

const StudySessionSchema = new mongoose.Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
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

const StudySession = mongoose.model('StudySession', StudySessionSchema);

module.exports = StudySession;