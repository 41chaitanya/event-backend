import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        date: { 
            type: Date, 
            required: true 
        },
        location: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String 
        },
        organizerId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        attendees: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User" 
            }
        ]
    }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;