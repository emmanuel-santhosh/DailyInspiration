import type {JournalEntryResponseDto} from "./JournalEntryDto.ts";

export interface JournalEntryCreateResult {
    success:boolean,
    data?:JournalEntryResponseDto,
    error?:string
}

export interface ApiErrorResponse {
    message?: string,
    errors?: Record<string, string>
}