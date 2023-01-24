import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGE:any = {
  require: 'Should not be empty',
  email: 'Email is required'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input() control!: AbstractControl;
  @Input() showErrorWhen:boolean = true;
  errorMessages:string[] = [];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    //throw new Error('Method not implemented.');
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges
    .subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges
    .subscribe(() => {
      this.checkValidation();
    });
  }

  checkValidation():void{
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }else{
      const errorKeys = Object.keys(errors);
      this.errorMessages = errorKeys
      .map(key => VALIDATORS_MESSAGE[key]);
    }
  }

}
