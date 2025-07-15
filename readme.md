A simple API built with express.

Offers the following endpoints:

GET /v1/health
    - Description: Used to check if the service is functional
    - Input: No input args
    - Return: {
        active: boolean
    } 

GET /v1/supporter-donations
    - Description: Returns a list of supporters, with their donation information
    - Input - 'useExport' as query - default true - This effects how the system uses the underlying service, either through exports, or through pulling all the donations page by page (using export is recommended for speed)
    - Return: {
        supporterId: string,
        supporterName: string,
        totalDonations: number,
        totalDonatedAmount: number,
    }[]