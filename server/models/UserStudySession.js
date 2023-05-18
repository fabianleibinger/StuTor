import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserStudySessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    studySession: {
        type: Schema.Types.ObjectId,
        ref: 'StudySession',
        required: true,
    },
});

const UserStudySession = mongoose.model('UserStudySession', UserStudySessionSchema);

export default UserStudySession;
