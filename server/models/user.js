let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = mongoose.Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'email is required'
    },
    displayName: {
        type: String,
        default: '',
        trim: true,
        required: 'display name is required'
    },
    create: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "users"
});

let options = ({ missingPasswordError: 'Wrong / Missing Password' });

UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', UserSchema)
// module.exports.User = mongoose.model('User', User)