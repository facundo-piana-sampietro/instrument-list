import { Instrument } from "@/interfaces/instrument";
import { InstrumentService } from "@/services/instrument.service";
import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, pipe, switchMap, tap } from "rxjs";
import { tapResponse } from '@ngrx/operators';

type InstrumentState = {
  instruments: Instrument[];
  loadingState: 'Loading' | 'Loaded' | 'Error';
};

const initialState: InstrumentState = {
  instruments: [],
  loadingState: 'Loading',
};

export const InstrumentStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    getAll: computed(() => state.instruments()),
    isLoaded: computed(() => state.loadingState() === 'Loaded'),
    isError: computed(() => state.loadingState() === 'Error'),
    instrumentsKnown: computed(() => state.instruments().filter(i => i.playsIt))
  })),
  withMethods((store, instrumentService = inject(InstrumentService)) => ({
    loadAll: rxMethod(
      pipe(
        debounceTime(1500),
        tap(() => patchState(store, { loadingState: "Loading" })),
        switchMap(() => {
          return instrumentService.getAll().pipe(
            tapResponse({
              next: (instruments) => {
                patchState(store, { instruments, loadingState: 'Loaded' })
              },
              error: () => {
                patchState(store, { loadingState: 'Error' })
              },
            })
          )
        })
      )
    ),
    updateInstrument: rxMethod<Instrument>(
      pipe(
        switchMap((updatedInstrument) => {
          return instrumentService.update(updatedInstrument).pipe(
            tapResponse({
              next: () => {
                const filtered = store.instruments().filter(i => i.id !== updatedInstrument.id);
                const newInstruments = [...filtered, updatedInstrument]
                patchState(store, {instruments: newInstruments})
              }, 
              error: () => {}
            })
          )
        })
      )
    )
  })),
  withHooks({
    onInit(store){
      store.loadAll(null);
    }
  })
);