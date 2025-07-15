import { API_URL } from "../env/system";

export interface GETRequest<T>{
    object: "list" | "export",
    page?: number,
    total?: number,
    has_more?: boolean,
    url?: string,
    status?: "pending" | "ready",
    ready_at?: string | Date,
    expires_at?: string | Date,
    data: T[]
}

export interface Supporter {
    object: "supporter",
    id: string,
    name: string,
    created_at: string | Date,
    address_1: string,
    address_2: string,
    city: string,
    passcode: string,
}

export interface Donation {
    object: "donation",
    id: string,
    supporter_id: string,
    amount: number,
    created_at: string | Date,
}

export interface POSTRequest {
    object: "export",
    id: string,
    create_at: string | Date,
    status: "pending",
    url: string
}

export type IFewFarService = ReturnType<typeof FewFarService>;

export const FewFarService = (args?: {
    version?: 'v1'
}) => {

    const { version="v1" } = args || {};


    const getSupporters = async () => {
        console.log('test', `${API_URL}/${version}/supporters`)
        const response = await fetch(`${API_URL}/${version}/supporters`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.error('Error fetching supporters:', response.statusText);
            throw new Error('Failed to fetch supporters - '+ response.statusText);
        }
        return (await response.json()) as GETRequest<Supporter>;
    };

    const getDonations = async (args: {
        page?: number,
    }) => {
        const { page } = args;

        const response = await fetch(`${API_URL}/${version}/donations?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.error('Error fetching donations:', response.statusText);
            throw new Error('Failed to fetch donations - '+ response.statusText);
        }
        return (await response.json()) as GETRequest<any>; // Replace 'any' with the actual type for donations
    
    }

    const generateDonationExport = async () => {
        const response = await fetch(`${API_URL}/${version}/donations_exports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.error('Error generating donation export:', response.statusText);
            throw new Error('Failed to generate donation export - ' + response.statusText);
        }
        return (await response.json()) as POSTRequest;
    }

    const getDonationExport = async (id: string) => {
        const response = await fetch(`${API_URL}/${version}/donations_exports/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.error('Error fetching donation export:', response.statusText);
            throw new Error('Failed to fetch donation export - ' + response.statusText);
        }
        return (await response.json()) as GETRequest<Donation>;
    }

    return {
        getSupporters,
        getDonations,
        generateDonationExport,
        getDonationExport
    };
}