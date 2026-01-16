
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <section class="py-20 min-h-screen bg-stone-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span class="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">Get in Touch</span>
            <h1 class="text-5xl md:text-6xl font-serif mb-10 leading-tight">We await your arrival with open arms.</h1>
            
            <div class="space-y-10">
              <div>
                <h4 class="text-xs uppercase tracking-widest text-stone-400 font-bold mb-2">Location</h4>
                <p class="text-lg font-light">123 Azure Drive, Santorini Coast, Greece</p>
              </div>
              <div>
                <h4 class="text-xs uppercase tracking-widest text-stone-400 font-bold mb-2">Reservations</h4>
                <p class="text-lg font-light">+30 228 1234567</p>
                <p class="text-lg font-light">book&#64;lessence-resort.com</p>
              </div>
              <div>
                <h4 class="text-xs uppercase tracking-widest text-stone-400 font-bold mb-2">Concierge</h4>
                <p class="text-lg font-light">concierge&#64;lessence-resort.com</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-12 shadow-2xl">
            <h2 class="text-3xl font-serif mb-8">Send an Inquiry</h2>
            <form class="space-y-6" (submit)="onSubmit($event)">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-[10px] uppercase tracking-widest text-stone-400">First Name</label>
                  <input type="text" class="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-gold font-light">
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] uppercase tracking-widest text-stone-400">Last Name</label>
                  <input type="text" class="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-gold font-light">
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-[10px] uppercase tracking-widest text-stone-400">Email Address</label>
                <input type="email" class="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-gold font-light">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] uppercase tracking-widest text-stone-400">Message</label>
                <textarea rows="4" class="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-gold font-light resize-none"></textarea>
              </div>
              <button type="submit" class="w-full bg-stone-900 text-white py-4 text-xs uppercase tracking-widest hover:bg-gold transition-all duration-300">
                Send Message
              </button>
            </form>
            @if (submitted()) {
              <p class="mt-6 text-green-600 text-sm font-light text-center animate-fade-in">Thank you. Our team will contact you shortly.</p>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  submitted = signal(false);

  onSubmit(e: Event) {
    e.preventDefault();
    this.submitted.set(true);
  }
}
