package com.fooding.api.waiting.event;

/** Raised inside the waiting transaction; turned into an SSE notification only after commit. */
public record WaitingChangedEvent(Long foodTruckId, String name, Object data) {
}
