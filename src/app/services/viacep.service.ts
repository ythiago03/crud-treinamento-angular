import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  url: string = 'https://viacep.com.br/ws/' 

  constructor(private http: HttpClient) { 

  }

  getAddress(cep: string){
    return this.http.get(`${this.url}${cep}/json`);
  }
}
