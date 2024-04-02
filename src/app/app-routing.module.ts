import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: FormComponent},
    {path: 'editar', pathMatch: 'full', component: HeaderComponent},
    {path: 'excluir', pathMatch: 'full', component: HeaderComponent},
    {path: 'pesquisar', pathMatch: 'full', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
