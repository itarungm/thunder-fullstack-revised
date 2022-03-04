import { Directive } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";

@Directive({ selector: '[formControlTrimmer]' })
export class FormControlTrimmerDirective {
  constructor(private ngControl: NgControl) {
    if(ngControl.valueAccessor){
      trimValueAccessor(ngControl.valueAccessor)
    }
  }
}

function trimValueAccessor(valueAccessor: ControlValueAccessor) {
  const original = valueAccessor.registerOnChange;

  valueAccessor.registerOnChange = (fn: (_: unknown) => void) => {
    return original.call(valueAccessor, (value: unknown) => {
      return fn(typeof value === 'string' ? value.trim() : value);
    });
  };
}