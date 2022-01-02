import express from "express";
import mongoose from "mongoose";
import authRouter from "./src/routes/authRouter.js";
import usersRouter from "./src/routes/usersRouter.js"

const PORT = process.env.PORT || 5000

const app = express()


app.use(express.json())
app.use('/auth', authRouter)
app.use('/api', [usersRouter])

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@movies.swkqk.mongodb.net/movies?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}...`))
    } catch (e) {
        console.log(e)
    }
}
start()
