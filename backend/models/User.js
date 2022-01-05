const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firebaseId: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
        }
    },
    {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
        }
    }
);

module.exports = mongoose.model('User', userSchema);
    
