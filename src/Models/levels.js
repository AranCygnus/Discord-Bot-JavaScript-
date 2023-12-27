const { model, Schema } = require("mongoose");


const levelSchema = new Schema({
    UserId: { type: String, required: true },
    GuildId: { type: String, required: true },
    Exp: { type: Number, default: 0 },
    Level: { type: Number, default: 0 }
});

module.exports = model("Level", levelSchema);