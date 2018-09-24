import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirmMsg(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {      }
    });
  }

  successMsg(message: string) {
    alertify.success(message);
  }

  errorMsg(message: string) {
    alertify.error(message);
  }

  warningMsg(message: string) {
    alertify.warning(message);
  }

  normalMsg(message: string) {
    alertify.message(message);
  }

}
