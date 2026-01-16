
import { Component, inject, signal } from '@angular/core';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-amenities',
  template: `
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <h1 class="text-5xl font-serif mb-6">World-Class Experiences</h1>
          <p class="text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
            From sunrise yoga sessions to twilight cocktails, we offer a curated selection of activities designed to refresh your body and inspire your mind.
          </p>
        </div>

        <div class="space-y-32">
          @for (item of amenities; track item.id; let odd = $odd) {
            <div [id]="item.id" class="flex flex-col md:flex-row items-center gap-16 scroll-mt-32" [class.md:flex-row-reverse]="odd">
              <div class="flex-1 w-full">
                <div class="relative group">
                  <img [src]="item.image" [alt]="item.title" class="w-full h-[500px] object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                  <div class="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 w-48 h-48 bg-stone-100 -z-10"></div>
                </div>
              </div>
              <div class="flex-1 space-y-6">
                <span class="text-gold uppercase tracking-[0.3em] text-xs font-bold">Featured Facility</span>
                <h2 class="text-4xl font-serif">{{ item.title }}</h2>
                <p class="text-stone-500 font-light text-lg leading-relaxed">{{ item.description }}</p>
                
                @if (expandedId() === item.id) {
                  <div class="pt-4 animate-fade-in border-l-2 border-gold pl-6 space-y-4">
                    <p class="text-sm text-stone-600 font-light italic">"Our award-winning staff is dedicated to tailoring every aspect of this experience to your personal needs. We recommend booking 24 hours in advance for the best availability."</p>
                    <div class="flex gap-4">
                      <span class="text-[10px] uppercase tracking-widest text-gold font-bold">Hours: 08:00 - 22:00</span>
                      <span class="text-[10px] uppercase tracking-widest text-gold font-bold">Reservation Required</span>
                    </div>
                  </div>
                }

                <div class="pt-6">
                  <ul class="grid grid-cols-2 gap-4">
                    <li class="flex items-center gap-2 text-sm text-stone-600">
                      <span class="w-1.5 h-1.5 rounded-full bg-gold"></span> Open 24/7
                    </li>
                    <li class="flex items-center gap-2 text-sm text-stone-600">
                      <span class="w-1.5 h-1.5 rounded-full bg-gold"></span> Exclusive Access
                    </li>
                  </ul>
                </div>
                
                <button 
                  (click)="exploreService(item.id)"
                  class="mt-8 px-10 py-3 border border-stone-200 text-xs uppercase tracking-widest transition-all"
                  [class.bg-stone-900]="expandedId() === item.id"
                  [class.text-white]="expandedId() === item.id"
                  [class.hover:bg-stone-900]="expandedId() !== item.id"
                  [class.hover:text-white]="expandedId() !== item.id">
                  {{ expandedId() === item.id ? 'View Less' : 'Explore Service' }}
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Additional Activities -->
    <section class="bg-stone-50 py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="group text-center p-8 bg-white shadow-sm hover:shadow-xl transition-all cursor-pointer">
            <h4 class="font-serif text-xl mb-4 group-hover:text-gold transition-colors">Wine Tasting</h4>
            <p class="text-xs text-stone-400 uppercase tracking-widest">Local Vineyards</p>
          </div>
          <div class="group text-center p-8 bg-white shadow-sm hover:shadow-xl transition-all cursor-pointer">
            <h4 class="font-serif text-xl mb-4 group-hover:text-gold transition-colors">Private Yacht</h4>
            <p class="text-xs text-stone-400 uppercase tracking-widest">Island Hopping</p>
          </div>
          <div class="group text-center p-8 bg-white shadow-sm hover:shadow-xl transition-all cursor-pointer">
            <h4 class="font-serif text-xl mb-4 group-hover:text-gold transition-colors">Coastal Yoga</h4>
            <p class="text-xs text-stone-400 uppercase tracking-widest">Sunrise Rituals</p>
          </div>
          <div class="group text-center p-8 bg-white shadow-sm hover:shadow-xl transition-all cursor-pointer">
            <h4 class="font-serif text-xl mb-4 group-hover:text-gold transition-colors">Culinary Class</h4>
            <p class="text-xs text-stone-400 uppercase tracking-widest">Authentic Recipes</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
  `]
})
export class AmenitiesComponent {
  private hotelService = inject(HotelService);
  amenities = this.hotelService.getAmenities()();
  expandedId = signal<string | null>(null);

  exploreService(id: string) {
    if (this.expandedId() === id) {
      this.expandedId.set(null);
    } else {
      this.expandedId.set(id);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
