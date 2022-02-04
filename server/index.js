import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import mongoose from 'mongoose'
import routes from './routes'
import cors from 'cors'


// data base connection
try {

    const DB_LINK = 'mongodb+srv://proxie:fnZzb8Q6yLiT0Ntx@cluster0.uwmjs.mongodb.net/TechEventsUK?retryWrites=true&w=majority';
    mongoose.connect(DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true, })

    const db = mongoose.connection

    db.on('error', (err) => {
        console.error('Connection error: ', err)
    })

    db.once('open', () => {
        console.log('Database connection successful')
    })
} catch (error) {
    console.log(error);
}


// create express app
const app = express()

app.use(cors())

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/v1', routes)


app.get('/', async (_, res) => {
    return res.status(200).json({
        message: 'You are welcome to TechEventsUK API, please hit a valid endpoint to get started.'
    });
});

app.use('/*', (_, res) => res.status(400).json({
    message: "This endpoint doesn't exist yet, check back sometime in future and we may have it"
}))

const port = 9001

app.listen(port, () => console.log(`Running on localhost:${port}
Node Env: ${process.env.NODE_ENV || 'development'}`))

export default app
