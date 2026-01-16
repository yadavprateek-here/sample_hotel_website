

import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, Routes } from '@angular/router';
import { AppComponent } from './src/app.component';
import { adminGuard } from './src/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./src/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'rooms',
    loadComponent: () => import('./src/pages/rooms/rooms.component').then(m => m.RoomsComponent)
  },
  {
    path: 'amenities',
    loadComponent: () => import('./src/pages/amenities/amenities.component').then(m => m.AmenitiesComponent)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./src/pages/gallery/gallery.component').then(m => m.GalleryComponent)
  },
  {
    path: 'booking',
    loadComponent: () => import('./src/pages/booking/booking.component').then(m => m.BookingComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./src/pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./src/pages/admin/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./src/pages/admin/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./src/pages/admin/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'rooms', loadComponent: () => import('./src/pages/admin/room-mgmt.component').then(m => m.RoomMgmtComponent) },
      { path: 'amenities', loadComponent: () => import('./src/pages/admin/amenity-mgmt.component').then(m => m.AmenityMgmtComponent) },
      { path: 'gallery', loadComponent: () => import('./src/pages/admin/gallery-mgmt.component').then(m => m.GalleryMgmtComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation())
  ]
}).catch(err => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.
