import type {JournalEntryRequestDto, JournalEntryResponseDto} from "../types/JournalEntryDto.ts";

export function ResponseToRequest(journalEntryResponse:JournalEntryResponseDto):JournalEntryRequestDto {
    return {
        quote:journalEntryResponse.quote,
        topic:journalEntryResponse.topic
    }
}