export interface SmartReport {
    id?: string;
    title: string;
    text: string;
    imageUrl: string;
    latitude?: number;
    longitude?: number;
    accuracy?: number;
}

export const EMPTY_REPORT: SmartReport = {
    id: undefined,
    title: '',
    text: '',
    imageUrl: '',
    latitude: undefined,
    longitude: undefined,
    accuracy: undefined
};