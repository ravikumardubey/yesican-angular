import { Component } from '@angular/core';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss'],
})
export class SocialShareComponent {
  showIcons: boolean = false;

  toggleShareIcons() {
    this.showIcons = !this.showIcons;
  }
  shareOnFacebook() {
    window.open(
      'https://www.facebook.com/sharer.php?u=' +
        encodeURIComponent(window.location.href)
    );
  }

  shareOnTwitter() {
    window.open(
      'https://twitter.com/intent/tweet?url=' +
        encodeURIComponent(window.location.href)
    );
  }

  shareOnWhatsAppDesktop() {
    window.open(
      'https://web.whatsapp.com://send?text=' +
        encodeURIComponent(window.location.href)
    );
  }
  shareOnWhatsAppMobile() {
    window.open(
      'whatsapp://send?text=' + encodeURIComponent(window.location.href)
    );
  }
}
