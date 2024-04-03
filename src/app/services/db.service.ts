import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../clientes/shared/cliente';
import { Search } from '../clientes/search/search';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  url: string = 'http://localhost:8080/customer/apiCustomer'
  constructor(private http: HttpClient) { 
  }

  postCustomer(formCliente: any){    
    //console.log(formCliente);
    return this.http.post(this.url, formCliente);
  }

  getCustomer(search: Search){    
    this.http.get(`${this.url}/${search.name}`).subscribe(res => (res)
    )

  }

}
