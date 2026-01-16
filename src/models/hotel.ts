
export interface Room {
  id: string;
  name: string;
  category: 'Suite' | 'Deluxe' | 'Villa';
  price: number;
  capacity: number;
  size: string;
  description: string;
  amenities: string[];
  images: string[];
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  active?: boolean;
}

export interface GalleryItem {
  id: string;
  url: string;
  category: 'Room' | 'Dining' | 'Spa' | 'Landscape';
  title: string;
  description: string;
}

export interface BookingState {
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  selectedRoomId: string | null;
}

export interface Testimonial {
  author: string;
  text: string;
  rating: number;
  location: string;
}
