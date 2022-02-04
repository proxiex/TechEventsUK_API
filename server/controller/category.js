import Category from '../models/category';
import { ObjectId } from 'mongodb';


class CategoryController {

    async createCategory(req, res) { // create category
        try {
            const category = await Category.create({ name: req.body.name });

            return res.status(201).json({
                status: 'success',
                data: {
                    category
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    async getAllCategories(req, res) { // get all categories
        try {
            const categories = await Category.find({});
            return res.status(200).json({
                status: 'success',
                data: {
                    categories
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
}

const categoryController = new CategoryController();

export default categoryController;
