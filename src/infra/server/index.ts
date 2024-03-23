import express from "express"
import { essayRoutes } from "./routes";

const app = express()
app.use(express.json())
app.use(essayRoutes)
export { app }