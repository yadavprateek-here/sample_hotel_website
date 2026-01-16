
import { Component, inject, signal } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { GalleryItem } from '../../models/hotel';

@Component({
  selector: 'app-gallery',
  template: `
    <section class="py-20 min-h-screen bg-white">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="text-center mb-16">
          <h1 class="text-5xl font-serif mb-4">A Glimpse of Paradise</h1>
          <p class="text-stone-500 font-light max-w-lg mx-auto">Explore our visual narrative across rooms, dining, and the serene landscape of our Mediterranean oasis.</p>
        </div>

        <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          @for (item of galleryItems(); track item.id) {
            <div 
              (click)="selectedItem.set(item)"
              class="relative group cursor-zoom-in overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
              <img [src]="item.url" class="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105">
              <div class="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div class="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span class="text-white text-xs uppercase tracking-[0.4em] block mb-2">{{ item.category }}</span>
                  <span class="text-gold text-[10px] uppercase tracking-widest font-bold border-b border-gold pb-1">View Details</span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    @if (selectedItem(); as item) {
      <div class="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-sm flex items-center justify-center p-6 md:p-12 animate-fade-in" (click)="selectedItem.set(null)">
        <div class="max-w-6xl w-full flex flex-col md:flex-row bg-white shadow-2xl relative" (click)="$event.stopPropagation()">
          
          <button (click)="selectedItem.set(null)" class="absolute -top-12 right-0 text-white hover:text-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="flex-[2] bg-stone-100 flex items-center justify-center">
            <img [src]="item.url" class="max-h-[80vh] w-full object-contain">
          </div>
          
          <div class="flex-1 p-10 md:p-16 flex flex-col justify-center">
            <span class="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">{{ item.category }}</span>
            <h2 class="text-3xl md:text-4xl font-serif mb-6">{{ item.title }}</h2>
            <p class="text-stone-500 font-light leading-relaxed mb-8">{{ item.description }}</p>
            <div class="pt-8 border-t border-stone-100">
              <p class="text-[10px] uppercase tracking-widest text-stone-400">Captured at</p>
              <p class="text-sm font-light mt-1">L'Essence Resort, Santorini</p>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class GalleryComponent {
  private hotelService = inject(HotelService);
  galleryItems = this.hotelService.getGallery();
  selectedItem = signal<GalleryItem | null>(null);
}
