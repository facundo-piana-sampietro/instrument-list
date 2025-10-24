import { Instrument } from '@/interfaces/instrument';
import { InstrumentStore } from '@/store/instrument-store';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

@Component({
  selector: 'plays-it',
  imports: [],
  templateUrl: './plays-it.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaysItComponent {
  readonly store = inject(InstrumentStore);

  instrumentsKnown = computed(() => this.store.instrumentsKnown());

  changeInstrument(instrument: Instrument) {
    const updatedInstrument: Instrument = {
      ...instrument,
      playsIt: !instrument.playsIt
    };

    this.store.updateInstrument(updatedInstrument);
  }

}
