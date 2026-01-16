
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { Amenity } from '../../models/hotel';

@Component({
  selector: 'app-admin-amenity-mgmt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="flex justify-between items-end mb-12">
      <div>
        <h1 class="text-4xl font-serif mb-2">Service Management</h1>
        <p class="text-stone-400 font-light">Define the luxury amenities and experiences offered at L'Essence.</p>
      </div>
      <button 
        (click)="openForm()"
        class="bg-stone-900 text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-gold transition-colors">
        New Amenity
      </button>
    </header>

    <div class="grid grid-cols-1 gap-4">
      @for (amenity of amenities(); track amenity.id) {
        <div class="bg-white p-6 shadow-sm flex items-center justify-between border-l-4" [class.border-gold]="amenity.active" [class.border-stone-200]="!amenity.active">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 bg-stone-50 flex items-center justify-center overflow-hidden">
               <img [src]="amenity.image" class="w-full h-full object-cover">
            </div>
            <div>
              <h4 class="text-lg font-serif">{{ amenity.title }}</h4>
              <p class="text-xs text-stone-400 font-light">{{ amenity.description }}</p>
            </div>
          </div>
          <div class="flex items-center gap-8">
            <div class="flex items-center gap-2">
              <span class="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Status:</span>
              <span class="text-[10px] uppercase tracking-widest font-bold" [class.text-green-600]="amenity.active" [class.text-stone-300]="!amenity.active">
                {{ amenity.active ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div class="flex gap-4 border-l border-stone-100 pl-8">
              <button (click)="openForm(amenity)" class="text-xs uppercase tracking-widest font-bold text-gold hover:text-stone-900">Edit</button>
              <button (click)="deleteAmenity(amenity.id)" class="text-xs uppercase tracking-widest font-bold text-stone-300 hover:text-red-600">Delete</button>
            </div>
          </div>
        </div>
      }
    </div>

    @if (isFormOpen()) {
      <div class="fixed inset-0 z-[100] bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
        <div class="bg-white w-full max-w-lg shadow-2xl p-10">
          <h2 class="text-2xl font-serif mb-8">{{ editingAmenity ? 'Edit Service' : 'Add Service' }}</h2>
          <form (submit)="saveAmenity($event)" class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Service Title</label>
              <input type="text" [(ngModel)]="amenityModel.title" name="title" class="w-full border-b py-2 focus:outline-none focus:border-gold font-light">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Summary</label>
              <input type="text" [(ngModel)]="amenityModel.description" name="description" class="w-full border-b py-2 focus:outline-none focus:border-gold font-light">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Banner Image URL</label>
              <input type="text" [(ngModel)]="amenityModel.image" name="image" class="w-full border-b py-2 focus:outline-none focus:border-gold font-light">
            </div>
            <div class="flex items-center gap-3">
              <input type="checkbox" [(ngModel)]="amenityModel.active" name="active" class="accent-gold h-4 w-4">
              <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Publicly Visible</label>
            </div>
            <div class="flex gap-4 mt-8 pt-4 border-t">
              <button type="button" (click)="closeForm()" class="flex-1 py-4 text-[10px] uppercase tracking-widest border border-stone-200">Cancel</button>
              <button type="submit" class="flex-1 bg-stone-900 text-white py-4 text-[10px] uppercase tracking-widest hover:bg-gold">Save Service</button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class AmenityMgmtComponent {
  private hotelService = inject(HotelService);
  amenities = this.hotelService.getAmenities();
  
  isFormOpen = signal(false);
  editingAmenity: Amenity | null = null;
  amenityModel: Amenity = this.getEmptyAmenity();

  private getEmptyAmenity(): Amenity {
    return { id: Math.random().toString(36).substr(2, 9), title: '', description: '', icon: 'sparkles', image: '', active: true };
  }

  openForm(amenity?: Amenity) {
    this.amenityModel = amenity ? { ...amenity } : this.getEmptyAmenity();
    this.editingAmenity = amenity || null;
    this.isFormOpen.set(true);
  }

  closeForm() { this.isFormOpen.set(false); }

  saveAmenity(e: Event) {
    e.preventDefault();
    this.hotelService.saveAmenity(this.amenityModel);
    this.closeForm();
  }

  deleteAmenity(id: string) {
    if (confirm('Permanently delete this service offering?')) {
      this.hotelService.deleteAmenity(id);
    }
  }
}
