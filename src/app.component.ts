
import { Component, signal, effect, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <nav class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center space-x-8">
          <a routerLink="/" class="text-2xl font-serif tracking-widest text-gold font-bold">L'ESSENCE</a>
          <div class="hidden md:flex space-x-6 text-sm uppercase tracking-widest font-medium text-gray-600">
            <a routerLink="/rooms" routerLinkActive="text-gold" class="hover:text-gold transition-colors">Rooms</a>
            <a routerLink="/amenities" routerLinkActive="text-gold" class="hover:text-gold transition-colors">Amenities</a>
            <a routerLink="/gallery" routerLinkActive="text-gold" class="hover:text-gold transition-colors">Gallery</a>
            <a routerLink="/contact" routerLinkActive="text-gold" class="hover:text-gold transition-colors">Contact</a>
          </div>
        </div>
        
        <div class="flex items-center space-x-6">
          <a routerLink="/booking" class="bg-gold text-white px-6 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-black transition-all duration-500 shadow-sm">
            Book Now
          </a>
          <!-- Mobile Menu Toggle -->
          <button class="md:hidden text-gray-800" (click)="toggleMobileMenu()">
            @if (!mobileMenuOpen()) {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden bg-white border-t border-gray-100 p-6 space-y-4 animate-fade-in">
          <a routerLink="/rooms" class="block text-lg font-serif" (click)="mobileMenuOpen.set(false)">Rooms & Suites</a>
          <a routerLink="/amenities" class="block text-lg font-serif" (click)="mobileMenuOpen.set(false)">Amenities</a>
          <a routerLink="/gallery" class="block text-lg font-serif" (click)="mobileMenuOpen.set(false)">Gallery</a>
          <a routerLink="/contact" class="block text-lg font-serif" (click)="mobileMenuOpen.set(false)">Contact</a>
        </div>
      }
    </header>

    <main class="pt-20">
      <router-outlet></router-outlet>
    </main>

    <footer class="bg-stone-900 text-white pt-20 pb-10">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="col-span-1 md:col-span-2">
          <h2 class="text-3xl font-serif mb-6 italic">L'Essence Resort & Spa</h2>
          <p class="text-stone-400 max-w-sm mb-8 leading-relaxed font-light">
            An oasis of tranquility nestled in the heart of the Mediterranean, where luxury meets the soul of nature.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 border border-stone-700 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold transition-all">
              <span class="sr-only">Instagram</span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 border border-stone-700 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold transition-all">
              <span class="sr-only">Facebook</span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.221c0-.822.112-1.117 1.21-1.117h2.79v-4.662h-4.028c-3.951 0-5.972 2.145-5.972 5.519v2.481z"/></svg>
            </a>
          </div>
        </div>
        
        <div>
          <h4 class="text-xs uppercase tracking-widest text-gold font-bold mb-6">Explore</h4>
          <ul class="space-y-3 text-stone-400 text-sm font-light">
            <li><a routerLink="/rooms" class="hover:text-white transition-colors">Rooms & Suites</a></li>
            <li><a routerLink="/amenities" class="hover:text-white transition-colors">Amenities & Spa</a></li>
            <li><a routerLink="/gallery" class="hover:text-white transition-colors">Photo Gallery</a></li>
            <li><a routerLink="/contact" class="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-xs uppercase tracking-widest text-gold font-bold mb-6">Stay with us</h4>
          <p class="text-stone-400 text-sm font-light leading-relaxed">
            123 Azure Drive, Santorini Coast<br>
            Greece, 84700<br>
            T: +30 228 1234567<br>
            E: info&#64;lessence-resort.com
          </p>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 tracking-widest uppercase">
        <p>&copy; 2025 L'Essence Resort & Spa. All Rights Reserved.</p>
        <div class="flex space-x-6 mt-4 md:mt-0 items-center">
          <a href="#" class="hover:text-white">Privacy Policy</a>
          <a href="#" class="hover:text-white">Terms of Service</a>
          <span class="text-stone-800">|</span>
          <a routerLink="/admin/login" class="text-stone-700 hover:text-gold transition-colors italic">Staff Portal</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AppComponent {
  mobileMenuOpen = signal(false);
  private authService = inject(AuthService);

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }
}
