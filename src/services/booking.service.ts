
import { Injectable, signal, computed } from '@angular/core';
import { BookingState } from '../models/hotel';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _state = signal<BookingState>({
    checkIn: this.getTodayStr(),
    checkOut: this.getTomorrowStr(),
    guests: 2,
    selectedRoomId: null
  });

  state = computed(() => this._state());
  
  minDate = signal(this.getTodayStr());

  updateDates(checkIn: string, checkOut: string) {
    this._state.update(s => ({ ...s, checkIn, checkOut }));
  }

  updateGuests(count: number) {
    this._state.update(s => ({ ...s, guests: count }));
  }

  selectRoom(roomId: string | null) {
    this._state.update(s => ({ ...s, selectedRoomId: roomId }));
  }

  private getTodayStr(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getTomorrowStr(): string {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }

  nightsCount = computed(() => {
    const s = this._state();
    if (!s.checkIn || !s.checkOut) return 1;
    const start = new Date(s.checkIn);
    const end = new Date(s.checkOut);
    const diff = end.getTime() - start.getTime();
    const nights = Math.ceil(diff / (1000 * 3600 * 24));
    return nights > 0 ? nights : 1;
  });

  isSelectionComplete = computed(() => {
    const s = this._state();
    return !!(s.checkIn && s.checkOut && s.selectedRoomId);
  });
}
