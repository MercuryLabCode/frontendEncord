import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { PageEvent } from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogGerenteComponent } from './../dialog-gerente/dialog-gerente.component';
export interface DialogData {
  estado: [];

}
@Component({
  selector: 'app-listado-solicitudes',
  templateUrl: './listado-solicitudes.component.html',
  styleUrls: ['./listado-solicitudes.component.css'],
})
export class ListadoSolicitudesComponent implements OnInit {
  searchText;
  public listOrdenes: any = [];

 


  page_size: number = 5; // CANTIDAD DE ELEMENTOS POR PAGINA
  page_number: number = 1;
  pageSizeOptions = [5, 10, 20, 50, 100];

  constructor(private _dataService: DataService,public dialog: MatDialog) {}

  ngOnInit() {
    this.getData();
  }
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  getData() {
    this._dataService.getData('FiltroGerencia').subscribe(
      (res) => {
        this.listOrdenes = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
    openDialog(orden) {
      console.log(orden);
      const dialogRef = this.dialog.open(DialogGerenteComponent, {
      width: '250px',
      data: {estado: orden}
    });
    

    dialogRef.afterClosed().subscribe(result => {
      this.getData() ;

      console.log(`Dialog result: ${result}`);
    });

   

   
  }


}


