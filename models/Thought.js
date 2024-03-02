const { Schema, model, Tyoes } = require("mongoose");
const date = require("../utils/formatDate");

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
         
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },

        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => date(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Though is required",
            minlength: 1,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => date(timestamp)
        },

        username: {
            type: String,
            required: true
        },

        reaction: [ReactionSchema]
    },

    {
        toJSON: {
            virtuals:true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reaction.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;