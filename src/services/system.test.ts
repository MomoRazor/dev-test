import { FewFarService } from './fewfar';
import { SystemService } from './system';
import fs from 'fs';

describe('System Service', () => {
    const fewfarService = FewFarService()
    const systemService = SystemService({ fewfarService });


    // it('run Supporter Donation with Export', async () => {
    //     console.time('Supporter Donation with Export');
    //     const data = await systemService.getSupporterDonations({ withExport: true });
    //     console.timeEnd('Supporter Donation with Export');

    //     fs.writeFileSync('/exports/exported_data_1.json', JSON.stringify(data, null, 2));
    // }, 999999999); // Increase timeout for this test

    it('run Supporter Donation without Export', async () => {
        console.time('Supporter Donation without Export');
        const data = await systemService.getSupporterDonations();
        console.timeEnd('Supporter Donation without Export');

        fs.writeFileSync('/exports/exported_data_2.json', JSON.stringify(data, null, 2));
    }, 999999999); // Increase timeout for this test

})
