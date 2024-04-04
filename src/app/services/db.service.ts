import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from '../clientes/search/search';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  url: string = 'http://localhost:8080/customer/apiCustomer';

  constructor(private http: HttpClient) { 
  }

  postCustomer(formCliente: any){     
    console.log('enviando para db',this.url,formCliente);
    return this.http.post(this.url, formCliente);
  }

  getCustomer(search: Search){    
    return this.http.get(`${this.url}/${search.name}`);
  }   

}
