const { model, Schema } = require("mongoose");
const { randomUUID } = require("crypto")

const voteSchema = new Schema({
    VoteId: { type: String, default: randomUUID },
    AuthorId: { type: String, required: true },
    GuildId: { type: String, required: true },
    MessageId: { type: String, required: true, unique: true },
    Content: { type: String, required: true },
    UpVotes: { type: [String], default: [] },
    DownVotes: { type: [String], default: [] },
}, { timestamps: true });

module.exports = model("Vote", voteSchema);
