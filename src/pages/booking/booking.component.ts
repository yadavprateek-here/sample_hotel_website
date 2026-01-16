
import { Component, inject, computed, signal } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { HotelService } from '../../services/hotel.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking',
  imports: [RouterLink],
  template: `
    <section class="py-20 min-h-screen bg-stone-50">
      <div class="max-w-7xl mx-auto px-6">
        
        <div class="text-center mb-16">
          <span class="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Reservation Engine</span>
          <h1 class="text-4xl md:text-5xl font-serif mb-2">Plan Your Sanctuary</h1>
          <p class="text-stone-500 font-light">Customizing your experience at L'Essence Resort.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Left Column: Settings & Availability -->
          <div class="lg:col-span-8 space-y-8">
            
            <!-- 1. Date Range Selection -->
            <div class="bg-white p-10 shadow-sm border-l-4 border-gold">
              <h3 class="text-xl font-serif mb-8 flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold">1</span>
                Your Dates
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Check-In</label>
                  <input 
                    type="date" 
                    [min]="bookingService.minDate()" 
                    [value]="state().checkIn"
                    (input)="onCheckInChange($event)"
                    class="w-full border-b py-3 focus:outline-none focus:border-gold font-light bg-transparent">
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Check-Out</label>
                  <input 
                    type="date" 
                    [min]="minCheckOut()" 
                    [value]="state().checkOut"
                    (input)="onCheckOutChange($event)"
                    class="w-full border-b py-3 focus:outline-none focus:border-gold font-light bg-transparent">
                </div>
              </div>
              @if (nights() > 0) {
                <p class="mt-6 text-[10px] uppercase tracking-widest text-gold font-bold bg-gold/5 px-4 py-2 inline-block">
                  Duration: {{ nights() }} Night{{ nights() > 1 ? 's' : '' }}
                </p>
              }
            </div>

            <!-- 2. Availability Calendar & Smart Warning -->
            <div class="bg-white p-10 shadow-sm">
              <div class="flex justify-between items-center mb-8 border-b pb-4">
                <h3 class="text-xl font-serif flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold">2</span>
                  Room Availability
                </h3>
                <div class="flex gap-4 text-[9px] uppercase tracking-widest font-bold">
                  <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-stone-100 border"></span> Avail</span>
                  <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-stone-300"></span> Booked</span>
                  <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-gold"></span> Your Stay</span>
                </div>
              </div>

              @if (selectedRoom(); as room) {
                <!-- Mini Calendar Mock -->
                <div class="mb-10">
                  <p class="text-xs uppercase tracking-widest text-stone-400 mb-6 font-bold">{{ currentMonthName }} Availability for {{ room.name }}</p>
                  <div class="grid grid-cols-7 gap-2">
                    @for (day of monthDays; track day) {
                      @let status = getDayStatus(day);
                      <div 
                        [class]="getDayClass(status)"
                        class="aspect-square flex items-center justify-center text-[10px] transition-all relative group">
                        {{ day }}
                        @if (status === 'booked') {
                           <div class="absolute inset-0 flex items-center justify-center opacity-20"><span class="w-full h-px bg-stone-900 rotate-45"></span></div>
                        }
                      </div>
                    }
                  </div>
                </div>

                <!-- Unavailability Warning & Alternatives -->
                @if (isCurrentSelectionBooked()) {
                  <div class="p-8 bg-red-50 border border-red-100 animate-fade-in">
                    <div class="flex items-start gap-4 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <h4 class="font-serif text-lg text-red-900">Unavailable sanctuary</h4>
                        <p class="text-sm text-red-700 font-light mt-1">The {{ room.name }} is already reserved for some of your selected dates.</p>
                      </div>
                    </div>
                    
                    <h5 class="text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-4">Recommended Alternatives</h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      @for (alt of availableAlternatives(); track alt.id) {
                        <div class="bg-white p-4 shadow-sm border border-stone-100 flex gap-4 items-center">
                          <img [src]="alt.images[0]" class="w-16 h-16 object-cover">
                          <div class="flex-1">
                            <h6 class="text-sm font-serif">{{ alt.name }}</h6>
                            <p class="text-[10px] text-gold font-bold">&dollar;{{ alt.price }}/nt</p>
                          </div>
                          <button (click)="selectRoom(alt.id)" class="text-[9px] uppercase tracking-widest font-bold border border-stone-200 px-3 py-1.5 hover:bg-gold hover:text-white transition-all">Switch</button>
                        </div>
                      }
                    </div>
                  </div>
                } @else {
                  <div class="p-6 bg-stone-50 text-stone-600 flex items-center gap-4 border border-stone-100 animate-fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-xs uppercase tracking-widest font-bold">Excellent Choice — Dates are available</p>
                  </div>
                }
              } @else {
                <div class="py-12 text-center text-stone-400 border-2 border-dashed border-stone-100">
                  <p class="text-sm font-light">Please select a room to view its availability calendar.</p>
                  <a routerLink="/rooms" class="text-gold text-xs uppercase tracking-widest font-bold mt-4 inline-block underline">Browse our Collections</a>
                </div>
              }
            </div>

            <!-- 3. Final Details -->
            <div class="bg-white p-10 shadow-sm">
              <h3 class="text-xl font-serif mb-8 flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold">3</span>
                Guest Information
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Full Name</label>
                  <input type="text" placeholder="John Doe" class="w-full border-b py-3 focus:outline-none focus:border-gold font-light bg-transparent">
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Email</label>
                  <input type="email" placeholder="john@luxury.com" class="w-full border-b py-3 focus:outline-none focus:border-gold font-light bg-transparent">
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Sticky Summary -->
          <div class="lg:col-span-4 sticky top-28">
            <div class="bg-stone-900 text-white p-10 shadow-2xl overflow-hidden relative">
              <h3 class="text-xl font-serif mb-10 italic text-gold border-b border-stone-800 pb-4">Stay Summary</h3>
              
              @if (selectedRoom(); as room) {
                <div class="space-y-8 relative z-10">
                  <div class="flex items-center gap-4">
                    <img [src]="room.images[0]" class="w-16 h-16 object-cover grayscale opacity-50">
                    <div>
                      <p class="text-xs font-serif">{{ room.name }}</p>
                      <p class="text-[10px] uppercase tracking-widest text-stone-500">{{ room.category }}</p>
                    </div>
                  </div>

                  <div class="space-y-4 text-xs font-light">
                    <div class="flex justify-between items-center py-2 border-b border-stone-800">
                      <span class="text-stone-500 uppercase tracking-widest text-[9px]">Check-In</span>
                      <span>{{ state().checkIn }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-stone-800">
                      <span class="text-stone-500 uppercase tracking-widest text-[9px]">Check-Out</span>
                      <span>{{ state().checkOut }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-stone-800">
                      <span class="text-stone-500 uppercase tracking-widest text-[9px]">Nights</span>
                      <span>{{ nights() }} night(s)</span>
                    </div>
                  </div>

                  <div class="pt-8 space-y-3">
                    <div class="flex justify-between text-xs font-light">
                      <span class="text-stone-400">Base Rate</span>
                      <span>&dollar;{{ baseTotal() }}</span>
                    </div>
                    <div class="flex justify-between text-xs font-light">
                      <span class="text-stone-400">Resort Tax (12%)</span>
                      <span>&dollar;{{ tax() }}</span>
                    </div>
                    
                    <div class="pt-8 flex justify-between items-end border-t border-stone-800 mt-6">
                      <div>
                        <span class="text-gold uppercase tracking-[0.2em] text-[10px] font-bold block mb-1">Total Stay</span>
                        <span class="text-3xl font-serif">&dollar;{{ totalStay() }}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    [disabled]="isCurrentSelectionBooked() || !isSelectionComplete()"
                    class="w-full bg-gold text-white py-5 mt-6 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white hover:text-stone-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                    Complete Reservation
                  </button>
                </div>
              } @else {
                <div class="text-center py-10 opacity-50">
                  <p class="text-sm font-light italic">Selection pending...</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class BookingComponent {
  public bookingService = inject(BookingService);
  private hotelService = inject(HotelService);

  state = this.bookingService.state;
  nights = this.bookingService.nightsCount;
  isSelectionComplete = this.bookingService.isSelectionComplete;
  
  currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
  monthDays = Array.from({ length: 30 }, (_, i) => i + 1);

  minCheckOut = computed(() => {
    const checkIn = this.state().checkIn;
    if (!checkIn) return this.bookingService.minDate();
    const d = new Date(checkIn);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });

  selectedRoom = computed(() => {
    const id = this.state().selectedRoomId;
    return id ? this.hotelService.getRoomById(id) : null;
  });

  isCurrentSelectionBooked = computed(() => {
    const room = this.selectedRoom();
    if (!room || !this.state().checkIn) return false;
    const day = new Date(this.state().checkIn).getDate();
    return !this.hotelService.isRoomAvailableOnDay(room.id, day);
  });

  availableAlternatives = computed(() => {
    const room = this.selectedRoom();
    if (!room) return [];
    const checkInDate = new Date(this.state().checkIn || '').getDate();
    return this.hotelService.getRooms()().filter(r => 
      r.id !== room.id && this.hotelService.isRoomAvailableOnDay(r.id, checkInDate)
    );
  });

  baseTotal = computed(() => {
    const room = this.selectedRoom();
    return room ? room.price * this.nights() : 0;
  });

  tax = computed(() => Math.round(this.baseTotal() * 0.12));
  totalStay = computed(() => this.baseTotal() + this.tax());

  onCheckInChange(e: any) {
    const val = e.target.value;
    const currentOut = this.state().checkOut;
    let nextOut = currentOut;
    
    // If check-in is after or same as current check-out, reset check-out
    if (currentOut && new Date(val) >= new Date(currentOut)) {
      const d = new Date(val);
      d.setDate(d.getDate() + 1);
      nextOut = d.toISOString().split('T')[0];
    }
    this.bookingService.updateDates(val, nextOut || '');
  }

  onCheckOutChange(e: any) {
    this.bookingService.updateDates(this.state().checkIn || '', e.target.value);
  }

  selectRoom(id: string) {
    this.bookingService.selectRoom(id);
  }

  getDayStatus(day: number): 'available' | 'booked' | 'selected' {
    const room = this.selectedRoom();
    if (!room) return 'available';
    
    const checkInDate = this.state().checkIn ? new Date(this.state().checkIn!).getDate() : null;
    const checkOutDate = this.state().checkOut ? new Date(this.state().checkOut!).getDate() : null;

    if (checkInDate && checkOutDate && day >= checkInDate && day < checkOutDate) {
      return 'selected';
    }

    return this.hotelService.isRoomAvailableOnDay(room.id, day) ? 'available' : 'booked';
  }

  getDayClass(status: string): string {
    switch (status) {
      case 'selected': return 'bg-gold text-white font-bold';
      case 'booked': return 'bg-stone-100 text-stone-300 cursor-not-allowed';
      default: return 'bg-white text-stone-800 border border-stone-50 hover:border-gold cursor-default';
    }
  }
}
