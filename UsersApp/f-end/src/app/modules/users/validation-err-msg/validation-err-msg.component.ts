import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-err-msg',
  templateUrl: './validation-err-msg.component.html',
  styleUrls: ['./validation-err-msg.component.css']
})
export class ValidationErrMsgComponent implements OnInit {

  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
