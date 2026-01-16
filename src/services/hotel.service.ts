
import { Injectable, signal } from '@angular/core';
import { Room, Amenity, Testimonial, GalleryItem } from '../models/hotel';

@Injectable({ providedIn: 'root' })
export class HotelService {
  private rooms = signal<Room[]>([
    {
      id: 'r1',
      name: 'Azure Presidential Suite',
      category: 'Suite',
      price: 1200,
      capacity: 2,
      size: '120m²',
      description: 'The ultimate luxury experience with panoramic ocean views and private butler service.',
      amenities: ['Private Balcony', 'Infinity Pool Access', 'Smart Controls', 'Premium Mini-Bar'],
      images: ['https://picsum.photos/id/433/1200/800', 'https://picsum.photos/id/201/1200/800']
    },
    {
      id: 'r2',
      name: 'Zen Garden Villa',
      category: 'Villa',
      price: 850,
      capacity: 4,
      size: '180m²',
      description: 'A secluded sanctuary surrounded by exotic flora and featuring an outdoor rainfall shower.',
      amenities: ['Private Garden', 'Kitchenette', 'Yoga Deck', 'Luxury Linens'],
      images: ['https://picsum.photos/id/652/1200/800', 'https://picsum.photos/id/274/1200/800']
    },
    {
      id: 'r3',
      name: 'Golden Hour Deluxe',
      category: 'Deluxe',
      price: 450,
      capacity: 2,
      size: '45m²',
      description: 'Perfectly balanced comfort and style, designed to capture the breathtaking sunset glows.',
      amenities: ['Work Desk', 'Marble Bathroom', 'Espresso Machine', 'High-Speed Wi-Fi'],
      images: ['https://picsum.photos/id/164/1200/800', 'https://picsum.photos/id/158/1200/800']
    }
  ]);

  private amenities = signal<Amenity[]>([
    {
      id: 'a1',
      title: 'Therapeutic Spa',
      description: 'Holistic rituals and world-class therapists.',
      icon: 'sparkles',
      image: 'https://picsum.photos/id/352/800/600',
      active: true
    },
    {
      id: 'a2',
      title: 'Fine Dining',
      description: 'Gourmet cuisine inspired by local flavors.',
      icon: 'utensils',
      image: 'https://picsum.photos/id/493/800/600',
      active: true
    },
    {
      id: 'a3',
      title: 'Infinity Pool',
      description: 'Temperature controlled with breathtaking horizons.',
      icon: 'waves',
      image: 'https://picsum.photos/id/660/800/600',
      active: true
    }
  ]);

  private galleryItems = signal<GalleryItem[]>([
    { id: 'g1', url: 'https://picsum.photos/id/101/1200/800', category: 'Landscape', title: 'Golden Horizon', description: 'View from the main terrace.' },
    { id: 'g2', url: 'https://picsum.photos/id/102/1200/1600', category: 'Room', title: 'Zen Minimalist', description: 'Sunlight in the Garden Villa.' },
    { id: 'g3', url: 'https://picsum.photos/id/103/1200/800', category: 'Dining', title: 'Oceanic Flavors', description: 'Freshly caught lobster.' },
    { id: 'g4', url: 'https://picsum.photos/id/104/1200/1200', category: 'Spa', title: 'Inner Calm', description: 'Our meditation room.' }
  ]);

  private testimonials = signal<Testimonial[]>([
    { author: 'Elena Rossi', text: 'An absolute dream. The attention to detail is unparalleled.', rating: 5, location: 'Milan, Italy' },
    { author: 'James Sterling', text: 'The most peaceful stay I have ever experienced. Simply magnificent.', rating: 5, location: 'London, UK' }
  ]);

  // Read Accessors
  getRooms() { return this.rooms; }
  getAmenities() { return this.amenities; }
  getGallery() { return this.galleryItems; }
  getTestimonials() { return this.testimonials; }
  
  getRoomById(id: string) { return this.rooms().find(r => r.id === id); }

  // Room CRUD
  saveRoom(room: Room) {
    const exists = this.rooms().some(r => r.id === room.id);
    if (exists) {
      this.rooms.update(prev => prev.map(r => r.id === room.id ? room : r));
    } else {
      this.rooms.update(prev => [...prev, room]);
    }
  }
  deleteRoom(id: string) { this.rooms.update(prev => prev.filter(r => r.id !== id)); }

  // Amenity CRUD
  saveAmenity(amenity: Amenity) {
    const exists = this.amenities().some(a => a.id === amenity.id);
    if (exists) {
      this.amenities.update(prev => prev.map(a => a.id === amenity.id ? amenity : a));
    } else {
      this.amenities.update(prev => [...prev, amenity]);
    }
  }
  deleteAmenity(id: string) { this.amenities.update(prev => prev.filter(a => a.id !== id)); }

  // Gallery CRUD
  saveGalleryItem(item: GalleryItem) {
    const exists = this.galleryItems().some(g => g.id === item.id);
    if (exists) {
      this.galleryItems.update(prev => prev.map(g => g.id === item.id ? item : g));
    } else {
      this.galleryItems.update(prev => [...prev, item]);
    }
  }
  deleteGalleryItem(id: string) { this.galleryItems.update(prev => prev.filter(g => g.id !== id)); }

  // Mock availability
  isRoomAvailableOnDay(roomId: string, day: number): boolean {
    const seed = roomId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (day + seed) % 5 !== 0; 
  }
}
