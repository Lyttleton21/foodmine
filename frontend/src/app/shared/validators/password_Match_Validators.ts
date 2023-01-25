import { AbstractControl } from "@angular/forms"

export const passwordMatchValidator =
 (passwordControlName: string, confirmPasswordControlName: string) => {
  const validator = (form: AbstractControl) => {
    const passwordControl = form.get(passwordControlName);
    const confirrmPasswordControl = form.get(confirmPasswordControlName);

    if(!passwordControl || !confirrmPasswordControl){
      return;
    }
    if(passwordControl.value !== confirrmPasswordControl.value){
      confirrmPasswordControl.setErrors({notMatch: true});
    }else{
      const errors = confirrmPasswordControl.errors;
      if(!errors){
        return;
      }else{
        delete errors.notMatch;
        confirrmPasswordControl.setErrors(errors);
      }
    }
  }
  return validator;

}
