import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import { addAdminDefault } from "./src/auth/auth.controller.js"

config()
initServer()
addAdminDefault()
