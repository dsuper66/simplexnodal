import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkBuilderViewComponent } from './network-builder-view/network-builder-view.component';



@NgModule({
  declarations: [NetworkBuilderViewComponent],
  exports: [
    NetworkBuilderViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ViewsModule { }

