
import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styles: [`
    .hero-gradient {
      background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%);
    }
    .text-shadow {
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
  `]
})
export class HomeComponent {
  private hotelService = inject(HotelService);
  private bookingService = inject(BookingService);

  featuredRooms = computed(() => this.hotelService.getRooms()().slice(0, 3));
  amenities = this.hotelService.getAmenities();
  testimonials = this.hotelService.getTestimonials();

  checkIn = signal('');
  checkOut = signal('');
  guests = signal(2);

  onBook() {
    // Always update the guest count so the Rooms page can filter correctly
    this.bookingService.updateGuests(this.guests());
    
    if (this.checkIn() && this.checkOut()) {
      this.bookingService.updateDates(this.checkIn(), this.checkOut());
    }
  }

  setCheckIn(event: any) { this.checkIn.set(event.target.value); }
  setCheckOut(event: any) { this.checkOut.set(event.target.value); }
  setGuests(event: any) { this.guests.set(Number(event.target.value)); }
}
