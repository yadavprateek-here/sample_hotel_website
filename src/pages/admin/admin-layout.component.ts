
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex min-h-screen bg-stone-50">
      <!-- Sidebar -->
      <aside class="w-64 bg-stone-900 text-white fixed h-full z-30">
        <div class="p-8 border-b border-stone-800">
          <h2 class="text-xl font-serif tracking-widest text-gold font-bold">L'ESSENCE</h2>
          <p class="text-[9px] uppercase tracking-widest text-stone-500 mt-1">Management Console</p>
        </div>

        <nav class="p-6 space-y-1">
          <p class="text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold mb-4 ml-4">Main</p>
          <a 
            routerLink="/admin/dashboard" 
            routerLinkActive="bg-stone-800 text-gold" 
            class="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Dashboard
          </a>

          <p class="text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold mb-4 mt-8 ml-4">Inventory</p>
          <a 
            routerLink="/admin/rooms" 
            routerLinkActive="bg-stone-800 text-gold" 
            class="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            Rooms
          </a>
          <a 
            routerLink="/admin/amenities" 
            routerLinkActive="bg-stone-800 text-gold" 
            class="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Amenities
          </a>
          <a 
            routerLink="/admin/gallery" 
            routerLinkActive="bg-stone-800 text-gold" 
            class="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Gallery
          </a>

          <div class="pt-10">
            <a 
              routerLink="/" 
              class="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors border-t border-stone-800">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              View Site
            </a>
          </div>
        </nav>

        <div class="absolute bottom-0 w-full p-6 border-t border-stone-800">
          <button (click)="logout()" class="flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-stone-500 hover:text-white transition-colors w-full">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sign Out
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="ml-64 flex-1 p-12 overflow-y-auto">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);
  logout() { this.authService.logout(); }
}
