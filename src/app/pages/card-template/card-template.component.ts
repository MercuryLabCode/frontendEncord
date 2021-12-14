
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.css']
})
export class CardTemplateComponent implements OnInit {
  @Input() titleCard:string;
  constructor() { }

  ngOnInit(): void {
  }

}
