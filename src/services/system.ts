import { Donation, IFewFarService, Supporter } from "./fewfar";

//artificial delay to not overload the API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const combineInformation = (args: {supporters: Supporter[], donations: Donation[]}) => {
    const { supporters, donations } = args;

    return supporters.map(supporter => {
        const supporterDonations = donations.filter(donation => donation.supporter_id === supporter.id);

        return {
            supporterId: supporter.id,
            supporterName: supporter.name,
            totalDonations: supporterDonations.length,
            totalDonatedAmount: supporterDonations.reduce((acc, donation) => acc + donation.amount, 0)
        };
    });
}


export interface SupporterDonation {
    supporterId: string,
    supporterName: string,
    totalDonations: number,
    totalDonatedAmount: number,
}

export type ISystemService = ReturnType<typeof SystemService>;

export const SystemService = (args: {
    fewfarService: IFewFarService,
}) => {

    const {fewfarService} = args;

    const getSupporterDonations = async (args?: {
        withExport?: boolean
    }) => {
        const {withExport= true } = args || {};

        const supportersResult = await fewfarService.getSupporters();

        let finalData: {
            supporterId: string,
            supporterName: string,
            totalDonations: number,
            totalDonatedAmount: number,
        }[] = []

        if(withExport){
            const exportResponse = await fewfarService.generateDonationExport();

            const exportId = exportResponse.id;
            let waiting = true
            while(waiting){
                const exportData = await fewfarService.getDonationExport(exportId);

                if(exportData.status === 'ready'){
                    waiting = false;

                    const {data} = exportData;

                    finalData = combineInformation({
                            supporters: supportersResult.data,
                            donations: data
                        })
                } else {
                    await delay(4000);
                }
            }
        }else{
            const donations = []
            let hasMore = true;
            let page = 1;

            while(hasMore){
                const donationsResult = await fewfarService.getDonations({ page });
                donations.push(...donationsResult.data);
                hasMore = donationsResult.has_more || false;
                page++;
            }

            finalData = combineInformation({
                supporters: supportersResult.data,
                donations
            });
        }

        return finalData;
    }


    return {
        getSupporterDonations
    }
}