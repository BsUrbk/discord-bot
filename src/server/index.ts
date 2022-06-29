import dotenv from 'dotenv'
import express, {Express, Request, Response, NextFunction } from 'express'

dotenv.config()

const app: Express = express()

app.use(express.json())

app.listen(process.env.PORT || 3000, () => console.log(`Up and running at ${process.env.HOSTNAME}:${process.env.PORT}`))
