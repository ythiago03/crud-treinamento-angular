import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Search } from 'src/app/clientes/search/search';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  formSearch!: FormGroup;

  constructor(private db: DbService) { }

  ngOnInit(): void {
    this.createSerch(new Search())
  }

  createSerch(searchValue: Search){
    this.formSearch = new FormGroup({
      name: new FormControl(searchValue.name)
    })
  }

  searchClient(){
    this.db.getCustomer(this.formSearch.value)
  }

}
