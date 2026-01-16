
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <header class="mb-12">
      <h1 class="text-4xl font-serif mb-2">Performance Overview</h1>
      <p class="text-stone-400 font-light">Real-time occupancy and revenue insights for the current fiscal month.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <div class="bg-white p-8 border-b-2 border-gold shadow-sm">
        <p class="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-4">Monthly Revenue</p>
        <h3 class="text-3xl font-serif">&dollar;142,850</h3>
        <p class="text-[10px] text-green-600 font-bold mt-2">↑ 12.4% vs LY</p>
      </div>
      <div class="bg-white p-8 shadow-sm">
        <p class="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-4">Occupancy Rate</p>
        <h3 class="text-3xl font-serif">84%</h3>
        <p class="text-[10px] text-stone-400 font-bold mt-2">24 Rooms Available</p>
      </div>
      <div class="bg-white p-8 shadow-sm">
        <p class="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-4">Active Bookings</p>
        <h3 class="text-3xl font-serif">412</h3>
        <p class="text-[10px] text-stone-400 font-bold mt-2">12 Check-ins Today</p>
      </div>
      <div class="bg-white p-8 shadow-sm">
        <p class="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-4">Guest Rating</p>
        <h3 class="text-3xl font-serif">4.92</h3>
        <p class="text-[10px] text-stone-400 font-bold mt-2">Based on 2.1k Reviews</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div class="lg:col-span-2 bg-white p-10 shadow-sm">
        <h3 class="text-xl font-serif mb-8 border-b pb-4">Recent Transactions</h3>
        <div class="space-y-6">
          @for (tx of transactions; track tx.id) {
            <div class="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-serif">
                  {{ tx.guest[0] }}
                </div>
                <div>
                  <p class="text-sm font-bold">{{ tx.guest }}</p>
                  <p class="text-[10px] uppercase text-stone-400">{{ tx.room }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold">&dollar;{{ tx.amount }}</p>
                <p class="text-[9px] uppercase tracking-widest text-gold">{{ tx.date }}</p>
              </div>
            </div>
          }
        </div>
      </div>

      <div class="bg-stone-900 text-white p-10 shadow-sm">
        <h3 class="text-xl font-serif mb-8 italic text-gold">System Logs</h3>
        <div class="space-y-6 text-xs font-light">
          <div class="border-l-2 border-stone-700 pl-4 py-1">
            <p class="text-stone-500 text-[9px]">10:42 AM</p>
            <p>New booking received: #LX-2091</p>
          </div>
          <div class="border-l-2 border-stone-700 pl-4 py-1">
            <p class="text-stone-500 text-[9px]">09:15 AM</p>
            <p>Inventory update: Presidential Suite r1</p>
          </div>
          <div class="border-l-2 border-stone-700 pl-4 py-1">
            <p class="text-stone-500 text-[9px]">Yesterday</p>
            <p>Monthly report generated automatically</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  transactions = [
    { id: 1, guest: 'Sophia Laurent', room: 'Presidential Suite', amount: 3600, date: 'Mar 12' },
    { id: 2, guest: 'Marcus Vane', room: 'Garden Villa', amount: 1700, date: 'Mar 11' },
    { id: 3, guest: 'Isabella Chen', room: 'Deluxe Suite', amount: 450, date: 'Mar 11' },
    { id: 4, guest: 'Robert Sterling', room: 'Garden Villa', amount: 2550, date: 'Mar 10' }
  ];
}
