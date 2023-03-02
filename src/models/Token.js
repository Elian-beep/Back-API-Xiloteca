import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token: {type: String},
    expirationDate: {type: Date}
})

tokenSchema.index({ expirationDate: 1 }, { expireAfterSeconds: 0 });

const Token = mongoose.model('tokens', tokenSchema);

export default Token;