
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { Room } from '../../models/hotel';

@Component({
  selector: 'app-admin-room-mgmt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="flex justify-between items-end mb-12">
      <div>
        <h1 class="text-4xl font-serif mb-2">Room Inventory</h1>
        <p class="text-stone-400 font-light">Manage your suite details, pricing, and amenities from a central console.</p>
      </div>
      <button 
        (click)="openForm()"
        class="bg-stone-900 text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-gold transition-colors">
        Add New Suite
      </button>
    </header>

    <div class="bg-white shadow-sm overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-stone-50 border-b border-stone-100">
          <tr>
            <th class="p-6 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Suite Details</th>
            <th class="p-6 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Category</th>
            <th class="p-6 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Base Rate</th>
            <th class="p-6 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Capacity</th>
            <th class="p-6 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-stone-50">
          @for (room of rooms(); track room.id) {
            <tr class="hover:bg-stone-50/50 transition-colors">
              <td class="p-6">
                <div class="flex items-center gap-4">
                  <img [src]="room.images[0]" class="w-12 h-12 object-cover">
                  <div>
                    <p class="text-sm font-bold">{{ room.name }}</p>
                    <p class="text-[10px] text-stone-400 uppercase tracking-widest">{{ room.size }}</p>
                  </div>
                </div>
              </td>
              <td class="p-6">
                <span class="px-3 py-1 bg-stone-100 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {{ room.category }}
                </span>
              </td>
              <td class="p-6 font-serif text-lg">&dollar;{{ room.price }}</td>
              <td class="p-6 text-sm font-light">{{ room.capacity }} Guests</td>
              <td class="p-6 text-right space-x-4">
                <button 
                  (click)="openForm(room)"
                  class="text-xs uppercase tracking-widest font-bold text-gold hover:text-stone-900">Edit</button>
                <button 
                  (click)="deleteRoom(room.id)" 
                  class="text-xs uppercase tracking-widest font-bold text-stone-300 hover:text-red-600">Delete</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    @if (rooms().length === 0) {
      <div class="py-32 text-center text-stone-400">
        <p class="italic">No inventory items found. Add a suite to begin.</p>
      </div>
    }

    <!-- Form Overlay -->
    @if (isFormOpen()) {
      <div class="fixed inset-0 z-[100] bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
        <div class="bg-white w-full max-w-2xl shadow-2xl p-10 max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-8 border-b pb-4">
            <h2 class="text-2xl font-serif">{{ editingRoom ? 'Edit Suite' : 'Add New Suite' }}</h2>
            <button (click)="closeForm()" class="text-stone-400 hover:text-stone-900">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <form (submit)="saveRoom($event)" class="space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Suite Name</label>
                <input type="text" [(ngModel)]="roomModel.name" name="name" required class="w-full border-b py-2 focus:outline-none focus:border-gold font-light">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Category</label>
                <select [(ngModel)]="roomModel.category" name="category" class="w-full border-b py-2 focus:outline-none focus:border-gold font-light bg-transparent">
                  <option value="Suite">Suite</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Price per Night</label>
                <input type="number" [(ngModel)]="roomModel.price" name="price" required class="w-full border-b py-2 focus:outline-none focus:border-gold font-light">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Size (m²)</label>
                <input type="text" [(ngModel)]="roomModel.size" name="size" class="w-full border-b py-2 focus:outline-none focus:border-gold font-light">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Capacity</label>
                <input type="number" [(ngModel)]="roomModel.capacity" name="capacity" class="w-full border-b py-2 focus:outline-none focus:border-gold font-light">
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Description</label>
              <textarea [(ngModel)]="roomModel.description" name="description" rows="3" class="w-full border-b py-2 focus:outline-none focus:border-gold font-light resize-none"></textarea>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Main Image URL</label>
              <input type="text" [(ngModel)]="roomModel.images[0]" name="imageUrl" class="w-full border-b py-2 focus:outline-none focus:border-gold font-light">
            </div>

            <button 
              type="submit" 
              class="w-full bg-stone-900 text-white py-4 text-xs uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all duration-300 mt-4">
              Save Suite Details
            </button>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class RoomMgmtComponent {
  private hotelService = inject(HotelService);
  rooms = this.hotelService.getRooms();
  
  isFormOpen = signal(false);
  editingRoom: Room | null = null;
  
  roomModel: Room = this.getEmptyRoom();

  private getEmptyRoom(): Room {
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      category: 'Suite',
      price: 0,
      capacity: 2,
      size: '',
      description: '',
      amenities: [],
      images: ['https://picsum.photos/id/10/1200/800']
    };
  }

  openForm(room?: Room) {
    if (room) {
      this.editingRoom = room;
      this.roomModel = { ...room, images: [...room.images] };
    } else {
      this.editingRoom = null;
      this.roomModel = this.getEmptyRoom();
    }
    this.isFormOpen.set(true);
  }

  closeForm() {
    this.isFormOpen.set(false);
  }

  saveRoom(e: Event) {
    e.preventDefault();
    this.hotelService.saveRoom(this.roomModel);
    this.closeForm();
  }

  deleteRoom(id: string) {
    if (confirm('Decommission this suite permanently?')) {
      this.hotelService.deleteRoom(id);
    }
  }
}
