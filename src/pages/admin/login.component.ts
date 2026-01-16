
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-stone-100 px-6">
      <div class="max-w-md w-full bg-white shadow-2xl p-10">
        <div class="text-center mb-10">
          <h1 class="text-3xl font-serif mb-2 tracking-widest">L'ESSENCE</h1>
          <p class="text-xs uppercase tracking-widest text-stone-400 font-bold">Administration Portal</p>
        </div>

        <form (submit)="onSubmit($event)" class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Email Address</label>
            <input 
              type="email" 
              [(ngModel)]="email" 
              name="email"
              class="w-full border-b py-3 focus:outline-none focus:border-gold font-light"
              placeholder="admin@lessence.com">
          </div>
          <div class="space-y-2">
            <label class="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Secret Key</label>
            <input 
              type="password" 
              class="w-full border-b py-3 focus:outline-none focus:border-gold font-light"
              placeholder="••••••••">
          </div>

          <button 
            type="submit" 
            class="w-full bg-stone-900 text-white py-4 text-xs uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all duration-300 shadow-xl">
            Access Dashboard
          </button>
        </form>

        <p class="mt-8 text-[9px] text-center text-stone-400 leading-relaxed italic">
          Unauthorized access to this portal is strictly prohibited and monitored.
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);
  email = 'admin@lessence.com';

  onSubmit(e: Event) {
    e.preventDefault();
    this.authService.login(this.email, 'ADMIN');
  }
}
