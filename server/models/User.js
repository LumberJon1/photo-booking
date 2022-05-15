const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid email address."]
        },
        password: {
            type: String,
            required: true,
            minlength: 4
        },
        firstName: {
            type: String,
            required: false,
            isAlpha: true,
            isNumeric: false
        },
        lastName: {
            type: String,
            required: false,
            isAlpha: true,
            isNumeric: false
        },
        // Include child events, which is an array of any open events that belong to that user
        events: [
            {
                type: Schema.Types.ObjectId,
                ref: "Event"
            }
        ]
    }
)

// Set up pre-save middleware to create password
userSchema.pre("save", async function(next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;