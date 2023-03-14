import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token: {type: String},
})

const Token = mongoose.model('tokens', tokenSchema);

export default Token;