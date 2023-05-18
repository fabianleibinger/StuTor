import Schema from 'mongoose';

const UserAchievementSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    achievement: { 
        type: Schema.Types.ObjectId,
        ref: 'Achievement',
        required: true,
    },
});

const UserAchievement = mongoose.model('UserAchievement', UserAchievementSchema);

export default UserAchievementSchema;