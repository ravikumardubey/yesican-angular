import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Subscription, of, throwError, timer } from 'rxjs';
import { Book } from 'src/app/core/models/books.model';
import { BookService } from 'src/app/core/services/book.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { SharedService } from 'src/app/core/services/shared.service';
import * as dayjs from 'dayjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-books-create-edit',
  templateUrl: './books-create-edit.component.html',
  styleUrls: ['./books-create-edit.component.scss'],
})
export class BooksCreateEditComponent implements OnInit, OnDestroy {
  image!: string;
  imageFileName = '';
  imageFile!: File;
  imageChangedEvent: any;
  book: Book = new Book();
  id = '';
  showLoading = true;
  isEdit = false;
  fileupload!: Subscription;
  progress = 0;
  remainingTime = 0;
  isUploadStarted = false;
  bookForm!: FormGroup;
  error = '';
  maxDate: NgbDateStruct;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private fileUploadService: FileUploadService,
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
    this.initializeForm();
    this.showLoading = this.route.snapshot.data['isEditPage'];
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.isEdit = true;
        this.bookService.getBookById(this.id).subscribe((response) => {
          this.book = new Book(response);
          this.image = this.book.imageUrl;
          this.initializeForm();
          this.showLoading = false;
        });
      }
    });
  }
  initializeForm() {
    this.bookForm = this.fb.nonNullable.group({
      title: new FormControl<string>(this.book.title, Validators.required),
      language: new FormControl<string>(
        this.book.language,
        Validators.required
      ),
      publisher: new FormControl<string>(
        this.book.publisher,
        Validators.required
      ),
      cartUrl: new FormControl<string>(this.book.cartUrl, Validators.required),
      publishDate: new FormControl<NgbDateStruct>(
        this.parseDateStringToNgbDate(this.book.publishDate),
        Validators.required
      ),
    });
  }
  validateForm() {
    if (this.bookForm.controls['title'].hasError('required')) {
      this.error = 'Title is required';
      return false;
    } else if (this.bookForm.controls['language'].hasError('required')) {
      this.error = 'Language is required';
      return false;
    } else if (this.bookForm.controls['publisher'].hasError('required')) {
      this.error = 'Publisher is required';
      return false;
    } else if (this.bookForm.controls['publishDate'].hasError('required')) {
      this.error = 'Publish Date is required';
      return false;
    } else if (this.bookForm.controls['cartUrl'].hasError('required')) {
      this.error = 'Buy Url is required';
      return false;
    } else if (!this.image) {
      this.error = 'Add Book Cover Image';
      return false;
    } else {
      this.error = '';
      return true;
    }
  }
  ngOnDestroy(): void {
    if (this.fileupload) {
      this.fileupload.unsubscribe();
    }
  }

  onSelect(event: any, content: any): void {
    this.imageFileName = event.target.files[0].name;
    this.modalService.open(content, {
      centered: true,
    });
    this.imageChangedEvent = event;
  }

  close() {
    this.modalService.dismissAll();
  }
  updateImage(image: any) {
    this.image = image;
  }
  updateImageFile(image: any) {
    this.imageFile = image;
  }
  clearImage() {
    this.image = '';
  }
  parseDateStringToNgbDate(dateString: string): NgbDateStruct {
    const date = dayjs(dateString);
    return {
      year: date.year(),
      month: date.month() + 1,
      day: date.date(),
    };
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
  submitData() {
    timer(2500).subscribe(() => {
      this.error = '';
    });
    if (this.validateForm()) {
      let data: any = {};
      const formData = this.bookForm.value;
      data['title'] = formData.title;
      data['publisher'] = formData.publisher;
      data['publish_date'] = this.formatNgbDate(formData.publishDate);
      data['cart_url'] = formData.cartUrl;
      data['language'] = formData.language;

      this.fileupload = (
        this.imageFile
          ? this.fileUploadService.uploadFile(this.imageFile)
          : of({
              success: true,
              progress: 100,
            })
      ).subscribe({
        next: (res) => {
          if (res) {
            this.isUploadStarted = true;
            this.progress = res.progress;
            this.remainingTime = res.remainingTime;
            if (res.success) {
              this.isUploadStarted = false;
              this.progress = 0;
              this.remainingTime = 0;
              data['image'] = res.uuid;
              data['is_enabled'] = true;
              this.isEdit
                ? this.bookService.updateBook(this.id, { ...data }).subscribe({
                    complete: () => {
                      this.sharedService.showSuccessNotification('Updated!');
                      this.router.navigate(['/admin/books']);
                    },
                    error: (error: Error) => {
                      this.sharedService.showErrorNotification(
                        'Failed! Try again later'
                      );
                      throwError(() => error);
                    },
                  })
                : this.bookService.createBook({ ...data }).subscribe({
                    next: (res) => {
                      if (res) {
                        this.sharedService.showSuccessNotification(
                          'Book Added!'
                        );
                        this.bookForm.reset();
                        this.image = '';
                      }
                    },
                    error: (error: Error) => {
                      this.sharedService.showErrorNotification(
                        'Failed! Try again later'
                      );
                      throwError(() => error);
                    },
                  });
              this.progress = 0;
            }
            if (res.error) {
              this.sharedService.showErrorNotification(
                'Failed! Try again later'
              );
              this.progress = 0;
            }
          }
        },
        error: (error) => {
          this.progress = 0;
          this.sharedService.showErrorNotification('Failed! Try again later');
          throwError(() => error);
        },
      });
    }
  }
}
