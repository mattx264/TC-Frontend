import { map, debounceTime } from 'rxjs/operators';

import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../../../projects/shared/src/lib/services/http-client.service';


export class EmailExistsValidator {

  static emailExists(httpClientService: HttpClientService) {

    return (control: AbstractControl) => {
      const emailRegex = new RegExp(/\S+@\S+\.\S+/);

      if (emailRegex.test(control.value)) {
        // return httpClientService.get('userRegistration/checkEmail/' + control.value).toPromise().then((result: any) => {
        //   if (result.message === 'Email exists') {
        //     return { emailExists: true };
        //   }
        //   return null;
        // });
        return null;
      }
    };
  }





  // constructor(private httpClientService: HttpClientService) {
  //   super();
  // }

  // emailExists = (control: AbstractControl) => {

  //   const emailRegex = new RegExp(/\S+@\S+\.\S+/);

  //   if (emailRegex.test(control.value)) {
  //     this.httpClientService.get('userRegistration/checkEmail/' + control.value).subscribe((response: any) => {
  //       if (response.message === 'Email exists') {
  //         console.log('asdas');
  //         return {
  //           'emailExists': true
  //         };
  //       }
  //     });
  //   }
  //   return null;
  // }
}
