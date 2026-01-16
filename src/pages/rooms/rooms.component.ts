
import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-rooms',
  imports: [RouterLink],
  template: `
    <section class="bg-stone-50 py-20 min-h-screen">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h1 class="text-5xl font-serif mb-4">Accommodation</h1>
          <p class="text-stone-500 font-light max-w-xl mx-auto">Each of our rooms and suites is a masterclass in Mediterranean luxury, blending contemporary design with traditional warmth.</p>
        </div>

        <div class="flex flex-wrap justify-center gap-4 mb-12">
          @for (cat of categories; track cat) {
            <button 
              (click)="filter.set(cat)"
              [class]="filter() === cat ? 'bg-gold text-white' : 'bg-white text-stone-500 hover:text-gold'"
              class="px-8 py-2 text-xs uppercase tracking-widest transition-all shadow-sm border border-transparent">
              {{ cat }}
            </button>
          }
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          @for (room of filteredRooms(); track room.id) {
            @let isSelected = bookingState().selectedRoomId === room.id;
            <div 
              class="group bg-white shadow-sm transition-all duration-500 relative"
              [class.ring-2]="isSelected"
              [class.ring-gold]="isSelected"
              [class.shadow-2xl]="isSelected"
              [class.scale-[1.02]]="isSelected">
              
              @if (isSelected) {
                <div class="absolute top-4 left-4 z-10 bg-gold text-white px-3 py-1 text-[9px] uppercase tracking-widest font-bold flex items-center gap-1 animate-fade-in">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                  Selected
                </div>
              }

              <div class="relative h-72 overflow-hidden">
                <img [src]="room.images[0]" [alt]="room.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000">
                <div class="absolute bottom-4 left-4 flex gap-2">
                  <span class="bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest font-bold">{{ room.size }}</span>
                  <span class="bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest font-bold">{{ room.capacity }} Guests</span>
                </div>
              </div>
              
              <div class="p-8">
                <h3 class="text-2xl font-serif mb-2" [class.text-gold]="isSelected">{{ room.name }}</h3>
                <p class="text-sm text-stone-500 font-light mb-6 leading-relaxed">{{ room.description }}</p>
                <div class="flex flex-wrap gap-2 mb-8">
                  @for (amenity of room.amenities.slice(0, 3); track amenity) {
                    <span class="text-[9px] uppercase tracking-widest bg-stone-100 px-2 py-1">{{ amenity }}</span>
                  }
                </div>
                <div class="flex items-center justify-between pt-6 border-t border-stone-100">
                  <div>
                    <span class="text-xs uppercase text-stone-400 tracking-widest block">Starting at</span>
                    <span class="text-xl font-serif text-gold">&dollar;{{ room.price }} <span class="text-sm font-sans text-stone-400">/ Night</span></span>
                  </div>
                  
                  <button 
                    (click)="selectRoom(room.id)" 
                    class="text-xs uppercase tracking-widest font-bold border-b-2 pb-1 transition-all"
                    [class.border-gold]="!isSelected"
                    [class.text-gold]="isSelected"
                    [class.border-stone-900]="isSelected"
                    [class.hover:text-gold]="!isSelected">
                    {{ isSelected ? 'Reserved' : 'Reserve Now' }}
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class RoomsComponent {
  private hotelService = inject(HotelService);
  private bookingService = inject(BookingService);

  categories = ['All', 'Suite', 'Deluxe', 'Villa'];
  filter = signal('All');

  rooms = this.hotelService.getRooms();
  bookingState = this.bookingService.state;

  filteredRooms = computed(() => {
    const f = this.filter();
    if (f === 'All') return this.rooms();
    return this.rooms().filter(r => r.category === f);
  });

  selectRoom(id: string) {
    this.bookingService.selectRoom(id);
  }
}
