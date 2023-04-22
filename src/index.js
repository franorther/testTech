import "dotenv/config";
import "./database/config.js"
import express  from "express";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 

//Routes
app.use('/api/v1/auth', authRoutes)

app.listen(PORT, ()=>{
    console.log(`Listening in port 🔥 ${PORT}`);
})