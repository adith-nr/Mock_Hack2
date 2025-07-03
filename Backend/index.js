import express from "express";
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import { ConnectDB } from "./db.js"
import authRoutes from "./routes/auth.routes.js"
import promptRoutes from "./routes/prompt.routes.js"
dotenv.config();

ConnectDB()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/auth",authRoutes)
app.use("/api/prompt",promptRoutes)
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

