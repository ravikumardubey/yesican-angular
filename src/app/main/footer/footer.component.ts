import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SharedService } from 'src/app/core/services/shared.service';
import { SubscriberService } from 'src/app/core/services/subscriber.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private subscriberService: SubscriberService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let data: any = {};
      data['email'] = this.form.controls['email'].value;
      this.subscriberService.subscribe(data).subscribe((res) => {
        if (res) {
          this.sharedService.showSuccessNotification(
            'Thank you for subscribing!'
          );
          this.form.reset();
        }
      });
    } else {
      this.sharedService.showErrorNotification(
        'Please enter a valid email address'
      );
    }
  }
}
