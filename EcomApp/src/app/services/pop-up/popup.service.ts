import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private _messageSource = new BehaviorSubject<{ title: string, message: string }>({ title: '', message: '' });
  message$ = this._messageSource.asObservable();
  private _popupStatus = new BehaviorSubject<boolean>(false);
  popupStatus$ = this._popupStatus.asObservable();

  setMessage(title: string, message: string) {
    this._messageSource.next({ title, message });
    this._popupStatus.next(true);
  }

  closePopup() {
    this._messageSource.next({ title: '', message: '' });
    this._popupStatus.next(false);
  }
  
  setPopupStatus(status: boolean) {
    this._popupStatus.next(status);
  }
}
