import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { PORT } from './env/system'
import { FewFarService } from './services/fewfar'
import { SystemService } from './services/system'
import { SystemRouter } from './routers/system'

const main = async () => {
    //Express Setup
    const app = express()
    app.use(cors())
    app.use(express.json({ limit: '16mb' }))
    app.use(morgan('dev'))

    const prefix = '/api'

    //Services
    const fewfarService = FewFarService()
    const systemService = SystemService({ fewfarService })

    //Local Routers
    const systemRouter = SystemRouter({ systemService })


    app.get(`${prefix}/health`, (_, res) => {
        res.status(200).send({
            active: true
        })
    })

    //API Routes
    app.use(prefix, systemRouter)

    console.info(`Server is running on port ${PORT}`)
}

main()
