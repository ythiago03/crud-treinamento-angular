import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormSearch } from 'src/app/clientes/search/formSearch';
import { Search } from 'src/app/clientes/search/search';
import { DbService } from 'src/app/services/db.service';
import { timer } from 'rxjs';



@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  formSearch!: FormGroup;
  formClients!: FormGroup;
  clients: any;
  isFormValid: boolean = false;
  showList: boolean = false;
  alertToggle: boolean = false;
  alertToggleDelete: boolean = false;

  constructor(private db: DbService) { }

  ngOnInit(): void {
    this.createSerch(new Search())
    this.createFormSerch(new FormSearch())
  }

  createSerch(searchValue: Search){
    this.formSearch = new FormGroup({
      name: new FormControl(searchValue.name, Validators.required)
    })
  }

  createFormSerch(formSearch: FormSearch){
    this.formClients = new FormGroup({
      name: new FormControl(formSearch.name, [
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      email: new FormControl(formSearch.email, Validators.email),
      birthday: new FormControl(formSearch.birthday),
      zipCode: new FormControl(formSearch.zipCode),
      street: new FormControl(formSearch.street),
      number: new FormControl(formSearch.number),
      district: new FormControl(formSearch.district),
      complement: new FormControl(formSearch.complement)
    })
  }


  searchClient(){
    if(this.formSearch.valid){
      this.db.getCustomer(this.formSearch.value).subscribe(res => {
        this.clients = res;
        this.showList = true;
        console.log(res);
        
      });
      this.isFormValid = true
    } 
  }

  deleteClient(cpf: string){
    this.db.deleteCustomer(cpf).subscribe(res => {
      this.alertToggleDelete = true;
      this.searchClient();
      this.closeAlert();
    }); 
  }


  salvarEditar(cpf: string, i: number){
    this.db.putCustomer(cpf, this.formClients.value).subscribe(res => {
      this.clients[i].isActive = !this.clients[i].isActive;
      this.alertToggle = true;
      this.searchClient();
      this.closeAlert();
    }); 
  }


  closeAlert(){
    setTimeout(() => {
      this.alertToggle = false;
      this.alertToggleDelete = false;
    }, 5 * 1000)
  }


}
