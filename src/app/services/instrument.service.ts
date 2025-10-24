import { Instrument } from '@/interfaces/instrument';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  API_URL = 'http://localhost:3000'
  #http = inject(HttpClient)

  getAll = () => this.#http.get<Instrument[]>(`${this.API_URL}/instruments`).pipe(map(instruments =>
      instruments.map(inst => ({
        ...inst,
        id: +inst.id
      }))
    )
  );

  update = (inst: Instrument) => this.#http.patch(`${this.API_URL}/instruments/${inst.id}`, inst);

}
