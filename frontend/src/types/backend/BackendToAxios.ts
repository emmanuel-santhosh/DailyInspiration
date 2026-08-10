import type {JournalEntryResponseDto} from "../JournalEntryDto.ts";

export interface JournalEntryCreateResult {
    success:boolean,
    data?:JournalEntryResponseDto
}

export interface JournalEntryDeleteResult {
    success:boolean,
    successMessage?:string
}