import { Component, OnInit, Output, Input } from '@angular/core';
import { Message } from '../../../interfaces/message'
@Component({
  selector: 'app-table-element',
  templateUrl: './table-element.component.html',
  styleUrls: ['./table-element.component.scss']
})
export class TableElementComponent implements OnInit {
  @Input() element: Message;
  constructor() { }
  ngOnInit() {
  }
}
