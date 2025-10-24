import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InstrumentStore } from './store/instrument-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'instrument-list';
  readonly store = inject(InstrumentStore);
}
