import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatePipe } from './paginate.pipe';
import { SearchPipe } from './search.pipe';
import {CustomMatPaginatorIntl} from './paginator.es';

import {MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { SeparatorMilesPipe } from './separator-miles.pipe';

@NgModule({
  declarations: [
    PaginatePipe,
    SearchPipe,
    SeparatorMilesPipe
  ],
  imports: [
    CommonModule,


  ],
  exports:[
    PaginatePipe,
    SearchPipe,
    SeparatorMilesPipe
  ],
  providers:[{
    provide:MatPaginatorIntl,
    useClass:CustomMatPaginatorIntl
  }]
})
export class PipesModule { }

