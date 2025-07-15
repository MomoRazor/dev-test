import { Router } from 'express'
import { ISystemService } from '../services/system'

export const SystemRouter = (args: {
    systemService: ISystemService
}) => {
    const router = Router()
    const { systemService } = args

    //-------------------------------------------------------------------------------------------------------

    router.get('/supporter-donations', async (req, res) => {
        const { useExport=true } = req.query

        try{
            const data = await systemService.getSupporterDonations({ withExport: useExport ? true : false })

            return res.status(200).send(data)
        }catch(e: unknown){
            console.error('Error in /supporter-donations:', e)
            return res.status(500).send({
                error: 'Internal Server Error',
                message: e instanceof Error ? e.message : 'An unexpected error occurred'
            })
        }
    })

    return router
}
