import mongoose from "mongoose";

const Token = mongoose.model('tokens', {
    token: String,
})

export default Token;