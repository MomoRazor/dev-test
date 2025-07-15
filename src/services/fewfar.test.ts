import { FewFarService } from './fewfar';

describe('FewFar Service Tests', () => {
    const fewfarService = FewFarService()

    let exportId

    it('run supporters call', async () => {
        const supporters = await fewfarService.getSupporters()

        console.log(supporters)
    })

    it('run donations call', async () => {
        const donations = await fewfarService.getDonations({ page: 1 })

        console.log(donations)
    })

    it('run generate donation export call', async () => {
        const exportResponse = await fewfarService.generateDonationExport()

        exportId = exportResponse.id

        console.log(exportResponse)
    })

    it('run get donation export call', async () => {
        const exportData = await fewfarService.getDonationExport(exportId)

        console.log(exportData)
    })
})
