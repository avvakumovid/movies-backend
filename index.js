import express from "express";
import mongoose from "mongoose";
import authRouter from "./src/routes/authRouter.js";

const PORT = process.env.PORT || 5000

const app = express()


app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@movies.swkqk.mongodb.net/movies?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}...`))
    } catch (e) {
        console.log(e)
    }
}
start()
