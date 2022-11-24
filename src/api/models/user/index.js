const mongoose = require('mongoose');
const { nameValidator, emailValidate, phoneNoValidator } = require('../../validators/user');

const { Schema } = mongoose;

const userSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name required.'],
        validate: {
            validator: nameValidator,
            message: props => `${props.value} is not valid.`
        }
    },
    email: {
        type: String,
        required: [true, 'email required.'],
        unique: [true, 'email must be unique.'],
        validate: {
            validator: emailValidate,
            message: props => `${props.value} isn't valid email.`
        }
    },
    phoneNo: {
        type: Number,
        required: [true, 'mobile no. required.'],
        validate: {
            validator: phoneNoValidator,
            message: props => `phoneNo no must be in 10 digit`
        }
    },
    password: {
        type: String,
        required: [true, 'password required.']
    },
    profileImgUrl: {
        type: String,
    },
    profileImgId: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);

