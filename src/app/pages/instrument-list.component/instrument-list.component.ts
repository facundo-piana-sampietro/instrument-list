import { Instrument } from '@/interfaces/instrument';
import { InstrumentStore } from '@/store/instrument-store';
import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaysItComponent } from './components/plays-it.component/plays-it.component';

@Component({
  selector: 'app-instrument-list.component',
  standalone: true,
  imports: [FormsModule, CommonModule, PlaysItComponent],
  templateUrl: './instrument-list.component.html',
  styleUrl: './instrument-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InstrumentListComponent {

  readonly store = inject(InstrumentStore);
  instruments = computed(() => this.store.getAll());

  currentId = signal(0);

  currentName = computed(() => this.instruments().find(instrument => instrument.id === this.currentId())?.name)

  prev() {
    this.currentId.update((id) => (id - 1 + this.instruments().length) % this.instruments().length)
  }

  next() {
    this.currentId.update((id) => (id + 1) % this.instruments().length)
  }

  changeInstrument(instrument: Instrument) {
    const updatedInstrument: Instrument = {
    ...instrument,
    playsIt: !instrument.playsIt
  };

  this.store.updateInstrument(updatedInstrument);

  }
}
