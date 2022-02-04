import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventsSchema = Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    title: {
        type: String,
        required: true
    },
    description: String,
    date: Date,
    isVirtual: {
        type: Boolean,
        default: false
    },
    address: String
}, {
    timestamps: true
});

eventsSchema.index({
    title: "text",
    category: "text",
    description: "text",
    isVirtual: "text",
    address: "text",
    date: "text"
});


const Events = mongoose.model('Events', eventsSchema);

export default Events;