import Schema from 'mongoose';

const AchievementSchema = new Schema({
    name: {
        type: String,
        required: true,
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

const Achievement = mongoose.model('Achievement', AchievementSchema);

module.exports = Achievement;