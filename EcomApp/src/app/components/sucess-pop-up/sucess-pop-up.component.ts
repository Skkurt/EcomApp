import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/services/pop-up/popup.service';

@Component({
  selector: 'app-sucess-pop-up',
  templateUrl: './sucess-pop-up.component.html',
  styleUrls: ['./sucess-pop-up.component.css']
})
export class SucessPopUpComponent implements OnDestroy {
  titre = '';
  message = '';
  private subscription: Subscription;

  constructor(private popupService: PopupService) {
    this.subscription = this.popupService.message$.subscribe(message => {
      this.titre = message.title;
      this.message = message.message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closePopup() {
    this.popupService.closePopup();
  }
}
