import Event from '../models/events';
import { ObjectId } from 'mongodb';


class EventsController {

    async createEvent(req, res) { // create event
        try {
            const event = await Event.create(req.body);
            console.log(req.body);
            return res.status(201).json({
                status: 'success',
                data: {
                    event
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    async getAllEvents(req, res) { // get all events
        try {

            const { query: { q, category, isVirtual } } = req;
            if (q) {

                const searchQuery = [
                    { title: { $regex: q, $options: 'i' } },
                    { description: { $regex: q, $options: 'i' } },
                    { address: { $regex: q, $options: 'i' } },
                ]

                if (category) {
                    searchQuery.push({ category: ObjectId(category) });
                }

                if (isVirtual) {
                    searchQuery.push({ isVirtual: isVirtual });
                }

                const events = await Event.find({
                    $or: searchQuery
                }).populate('category').sort('-createdAt');
                return res.status(200).json({
                    status: 'success',
                    data: {
                        events
                    }
                });
            }
            const events = await Event.find().populate('category').sort('-createdAt');
            return res.status(200).json({
                status: 'success',
                data: {
                    events
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    async getEventById(req, res) { // get event by id
        try {
            const event = await Event.findById(req.params.id).populate('category');
            return res.status(200).json({
                status: 'success',
                data: {
                    event
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    async updateEvent(req, res) { // update event
        try {
            const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json({
                status: 'success',
                data: {
                    event
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    async deleteEvent(req, res) { // delete event
        try {
            const event = await Event.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                status: 'success',
                data: {
                    event
                }
            });
        }
        catch (e) {
            console.log(e);
        }

    }


}

const eventsController = new EventsController();

export default eventsController;
