import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CanonicalService } from './core/services/canonical.service';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { fromEvent } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'yesican';
  isServer = true;
  constructor(
    private canonicalService: CanonicalService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private modalService: NgbModal
  ) {
    if (isPlatformServer(this.platformId)) {
      this.isServer = true;
      this.document.body.style.overflow = 'hidden';
    } else {
      this.isServer = false;
      this.document.body.style.overflow = '';
    }
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'popstate').subscribe(() => {
        this.modalService.dismissAll();
      });
    }
  }
  ngOnInit(): void {
    this.canonicalService.setCanonicalURL();
  }
}
