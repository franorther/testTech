import "dotenv/config";
import "./database/config.js"
import express  from "express";
import authRoutes from "./routes/auth.route.js";

const app = express();


app.use(express.json()); 

//Routes
app.use('/api/v1/auth', authRoutes)

//Solo para ejemplo de login con token
app.use(express.static("public"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listening in port 🔥 ${PORT}`);
})