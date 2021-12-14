import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../material.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { GraficLineComponent } from './grafic-line/grafic-line.component';
import { CardTemplateComponent } from './card-template/card-template.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {BreadcrumbModule} from 'angular-crumbs';
import { DialogComponent } from './dialog/dialog.component';

const list_pages = [ GraficLineComponent,NotFoundComponent,CardTemplateComponent , BreadcrumbComponent,DialogComponent];

@NgModule({
  declarations: [...list_pages ],
  imports: [CommonModule, PagesRoutingModule,BreadcrumbModule,MaterialModule,FormsModule,ReactiveFormsModule],
  exports: [...list_pages],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
