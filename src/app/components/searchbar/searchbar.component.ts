import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Search } from 'src/app/clientes/search/search';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  formSearch!: FormGroup;
  clients: any;
  isFormValid: boolean = false;
  showList: boolean = false;

  constructor(private db: DbService) { }

  ngOnInit(): void {
    this.createSerch(new Search())
  }

  createSerch(searchValue: Search){
    this.formSearch = new FormGroup({
      name: new FormControl(searchValue.name, Validators.required)
    })
  }

  searchClient(){
    if(this.formSearch.valid){
      this.db.getCustomer(this.formSearch.value).subscribe(res => {
        this.clients = res;
        this.showList = true;
      });
      this.isFormValid = true
    }
  }

  deleteClient(cpf: string){
    this.db.deleteCustomer(cpf).subscribe(res => {
      alert('Cliente deletado com sucesso!')
      this.searchClient();
    }); 
  }


  

  salvarEditar(cpf: string){

  }
  

}
