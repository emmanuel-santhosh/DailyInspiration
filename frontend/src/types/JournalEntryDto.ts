export type JournalEntryDto = {
    quote:string,
    topic:string
}

export const MAX_LENGTH_QUOTE:number = 500;
export const MAX_LENGTH_TOPIC:number = 50;

export const BASE_BACKEND_URI:string = "/api/myjournal";