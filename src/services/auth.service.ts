
import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User, AuthState } from '../models/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  
  private _state = signal<AuthState>({
    user: null,
    isAuthenticated: false
  });

  state = computed(() => this._state());
  isAdmin = computed(() => this._state().user?.role === 'ADMIN');

  login(email: string, role: 'USER' | 'ADMIN') {
    // Mock login logic
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      name: role === 'ADMIN' ? 'Administrator' : 'Valued Guest',
      role: role
    };

    this._state.set({
      user: mockUser,
      isAuthenticated: true
    });

    if (role === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this._state.set({ user: null, isAuthenticated: false });
    this.router.navigate(['/']);
  }
}
