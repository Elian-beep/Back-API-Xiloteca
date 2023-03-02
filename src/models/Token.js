import mongoose from "mongoose";

const Token = mongoose.model('tokens', {
    token: String,
    expirationDate: Date
})

export default Token;