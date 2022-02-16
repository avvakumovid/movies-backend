import express from 'express';
import mongoose from 'mongoose';
import authRouter from './src/routes/authRouter.js';
import usersRouter from './src/routes/usersRouter.js'
import movieRouter from './src/routes/movieRouter.js';
import genreRouter from './src/routes/genreRouter.js';
import cors from 'cors'

const PORT = process.env.PORT || 5000

const app = express()


app.use(express.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/api', [usersRouter, movieRouter, genreRouter])


const DebugMiddleware = (req, res, next) => {

    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);

    //console.dir(req);

    // let oSession = req.session;
    //
    // if (oSession && (oSession.mail == 'e.petrovich@unicon.ru (e.petrovich%40unicon.ru)')) {
    //
    //     oLogger.write.debug(`${oSession.mail} - запросил адрес  -  ${req.url}  ${req.method}`);
    //
    // }

    next();

};

app.use(DebugMiddleware);


const start = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/movies')
        // await mongoose.connect('mongodb://localhost:27017/movies')
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}...`))
    } catch (e) {
        console.log(e)
    }
}
start()
