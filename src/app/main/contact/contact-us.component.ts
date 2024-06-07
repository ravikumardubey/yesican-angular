import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { throwError, timer } from 'rxjs';
import { ContactUsService } from 'src/app/core/services/contact-us.service';
import { SharedService } from 'src/app/core/services/shared.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup = this.fb.nonNullable.group({
    name: new FormControl<string>('', [Validators.required]),
    profession: new FormControl<string>('', Validators.required),
    dob: new FormControl<string>(''),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    message: new FormControl<string>('', Validators.required),
    purpose: new FormControl<string>('', Validators.required),
  });
  error = '';
  maxDate: NgbDateStruct;
  showLoading = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private contactService: ContactUsService,
    private sharedService: SharedService,
    calendar: NgbCalendar
  ) {
    const currentDate = calendar.getToday();
    this.maxDate = {
      year: currentDate.year,
      month: currentDate.month,
      day: currentDate.day,
    };
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  validateForm() {
    if (this.contactForm.controls['name'].hasError('required')) {
      this.error = 'Name is required';
      return false;
    } else if (this.contactForm.controls['profession'].hasError('required')) {
      this.error = 'Profession is required';
      return false;
    } else if (this.contactForm.controls['email'].errors) {
      if (this.contactForm.controls['email'].errors['email']) {
        this.error = 'Enter a valid email';
      } else if (this.contactForm.controls['email'].errors['required']) {
        this.error = 'Email is required';
      }
      return false;
    } else if (this.contactForm.controls['message'].hasError('required')) {
      this.error = 'Message is required';
      return false;
    } else if (this.contactForm.controls['purpose'].hasError('required')) {
      this.error = 'Purpose is required';
      return false;
    } else {
      this.error = '';
      return true;
    }
  }
  formatNgbDate(date: NgbDateStruct): string {
    if (date) {
      const year = date.year.toString().padStart(4, '0');
      const month = date.month.toString().padStart(2, '0');
      const day = date.day.toString().padStart(2, '0');
      return dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DDTHH:mm:ssZ');
    }
    return '';
  }
  submit() {
    timer(2500).subscribe(() => {
      this.error = '';
    });
    if (this.validateForm()) {
      this.showLoading = true;
      let data: any = {};
      const formData = this.contactForm.value;
      data['name'] = formData.name;
      data['profession'] = formData.profession;
      data['dob'] = this.formatNgbDate(formData.dob);
      data['email'] = formData.email;
      data['message'] = formData.message;
      data['purpose'] = formData.purpose;

      this.contactService.createContactus({ ...data }).subscribe({
        complete: () => {
          this.contactForm.reset();
          this.sharedService.showSuccessNotification('Success!');
          this.showLoading = false;
        },
        error: (error: Error) => {
          this.sharedService.showErrorNotification('Failed! Try again later');
          this.showLoading = false;
          throwError(() => error);
        },
      });
    }
  }
}
