
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { GalleryItem } from '../../models/hotel';

@Component({
  selector: 'app-admin-gallery-mgmt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="flex justify-between items-end mb-12">
      <div>
        <h1 class="text-4xl font-serif mb-2">Gallery Management</h1>
        <p class="text-stone-400 font-light">Curate the visual experience for your potential guests.</p>
      </div>
      <button 
        (click)="openForm()"
        class="bg-stone-900 text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-gold transition-colors">
        Upload New Image
      </button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      @for (item of gallery(); track item.id) {
        <div class="bg-white group shadow-sm overflow-hidden flex flex-col">
          <div class="relative h-48">
            <img [src]="item.url" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button (click)="openForm(item)" class="p-2 bg-white text-stone-900 hover:text-gold transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button (click)="deleteItem(item.id)" class="p-2 bg-white text-stone-900 hover:text-red-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </div>
          <div class="p-4 flex-1">
            <span class="text-[9px] uppercase tracking-[0.2em] text-gold font-bold">{{ item.category }}</span>
            <h4 class="text-sm font-serif mt-1">{{ item.title }}</h4>
          </div>
        </div>
      }
    </div>

    <!-- Form Modal -->
    @if (isFormOpen()) {
      <div class="fixed inset-0 z-[100] bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
        <div class="bg-white w-full max-w-lg shadow-2xl p-10">
          <h2 class="text-2xl font-serif mb-8">{{ editingItem ? 'Update Asset' : 'Upload Asset' }}</h2>
          <form (submit)="saveItem($event)" class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Title</label>
              <input type="text" [(ngModel)]="itemModel.title" name="title" class="w-full border-b py-2 focus:outline-none focus:border-gold font-light">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Category</label>
              <select [(ngModel)]="itemModel.category" name="category" class="w-full border-b py-2 focus:outline-none focus:border-gold font-light bg-transparent">
                <option value="Landscape">Landscape</option>
                <option value="Room">Room</option>
                <option value="Dining">Dining</option>
                <option value="Spa">Spa</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Image URL</label>
              <input type="text" [(ngModel)]="itemModel.url" name="url" class="w-full border-b py-2 focus:outline-none focus:border-gold font-light">
            </div>
            <div class="flex gap-4 mt-8">
              <button type="button" (click)="closeForm()" class="flex-1 py-4 text-[10px] uppercase tracking-widest border border-stone-200">Cancel</button>
              <button type="submit" class="flex-1 bg-stone-900 text-white py-4 text-[10px] uppercase tracking-widest hover:bg-gold">Save Asset</button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class GalleryMgmtComponent {
  private hotelService = inject(HotelService);
  gallery = this.hotelService.getGallery();
  
  isFormOpen = signal(false);
  editingItem: GalleryItem | null = null;
  itemModel: GalleryItem = this.getEmptyItem();

  private getEmptyItem(): GalleryItem {
    return { id: Math.random().toString(36).substr(2, 9), url: '', category: 'Landscape', title: '', description: '' };
  }

  openForm(item?: GalleryItem) {
    this.itemModel = item ? { ...item } : this.getEmptyItem();
    this.editingItem = item || null;
    this.isFormOpen.set(true);
  }

  closeForm() { this.isFormOpen.set(false); }

  saveItem(e: Event) {
    e.preventDefault();
    this.hotelService.saveGalleryItem(this.itemModel);
    this.closeForm();
  }

  deleteItem(id: string) {
    if (confirm('Remove this image from the gallery?')) {
      this.hotelService.deleteGalleryItem(id);
    }
  }
}
