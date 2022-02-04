import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = Schema({
    name: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

categorySchema.index({
    name: "text"
});


const Category = mongoose.model('Category', categorySchema);

export default Category;