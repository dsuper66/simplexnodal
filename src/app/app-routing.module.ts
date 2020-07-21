import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NetworkBuilderViewComponent } from './views/network-builder-view/network-builder-view.component';
import { DataEntryViewComponent } from './views/data-entry-view/data-entry-view.component';

const routes: Routes = [
  {path: 'network-builder-component', component: NetworkBuilderViewComponent},
  {path: 'data-entry-component', component: DataEntryViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
