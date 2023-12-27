const { model, Schema } = require("mongoose");
const { randomUUID } = require("crypto")

const pollsSchema = new Schema({
    PollId: { type: String, default: randomUUID },
    GuildId: { type: String, required: true },
    MessageId: { type: String, required: true },
    Title: { type: String, required: true },
    Option: { type: Number, required: true },
    poll1Value: { type: String, required: true },
    poll2Value: { type: String, required: true },
    poll3Value: String,
    poll4Value: String,
    poll5Value: String,
    poll1Vote: Number,
    poll2Vote: Number,
    poll3Vote: Number,
    poll4Vote: Number,
    poll5Vote: Number,
    poll1Members: { type: [String], default: [] },
    poll2Members: { type: [String], default: [] },
    poll3Members: { type: [String], default: [] },
    poll4Members: { type: [String], default: [] },
    poll5Members: { type: [String], default: [] },
});

module.exports = model("Poll", pollsSchema);
