import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../../core/services/article.service';
import { Article, Category, Tags } from 'src/app/core/models/article.model';
import {
  Observable,
  Subject,
  Subscription,
  catchError,
  concat,
  distinctUntilChanged,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { TagsService } from 'src/app/core/services/tags.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-post-create-edit',
  templateUrl: './post-create-edit.component.html',
  styleUrls: ['./post-create-edit.component.scss'],
})
export class PostCreateEditComponent implements OnInit, OnDestroy {
  isEdit = false;
  showLoading = true;
  title = '';
  content!: string;
  isPublished = false;
  isUpcoming = false;
  image!: string;
  imageFileName = '';
  imageChangedEvent: any;
  imageId = '';
  croppedImage!: File;
  config: EditorComponent['init'] = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins:
      'preview importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    toolbar:
      'undo redo | code preview | bold italic underline strikethrough | fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen print | table image media link codesample',
    toolbar_mode: 'wrap',
    quickbars_insert_toolbar: false,
    quickbars_selection_toolbar: 'bold italic | blocks ',
    font_family_formats: 'helvetica,sans-serif',
    font_size_formats:
      '8pt 10pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 32pt 36pt 48pt',
    menubar: false,
    help_tabs: ['shortcuts', 'keyboardnav'],
    menu: {
      file: {
        title: 'File',
        items:
          'newdocument restoredraft | preview | export print | deleteallconversations',
      },
      edit: {
        title: 'Edit',
        items:
          'undo redo | cut copy paste pastetext | selectall | searchreplace',
      },
      view: {
        title: 'View',
        items: 'code',
      },
      insert: {
        title: 'Insert',
        items:
          'image media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime',
      },
      format: {
        title: 'Format',
        items:
          'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontsize align lineheight | forecolor backcolor | language | removeformat',
      },
      tools: {
        title: 'Tools',
        items: 'spellchecker spellcheckerlanguage | a11ycheck wordcount',
      },
      table: {
        title: 'Table',
        items:
          'inserttable | cell row column | advtablesort | tableprops deletetable',
      },
    },
    file_picker_types: 'image',
    image_advtab: false,
    image_description: false,
    block_unsupported_drop: true,
    placeholder: '',
    content_css: `/assets/tinymce.css?v=${Date.now()}`,
    content_style:
      'body{margin: 8px !important;}, img{max-width:100%;height:auto;}',
    images_reuse_filename: true,
    image_dimensions: true,
    image_class_list: [{ title: 'Responsive', value: 'img-responsive' }],
    paste_data_images: false,
    height: 'calc(100vh - 100px) ',
    branding: false,
    promotion: false,
    images_upload_handler: (blobInfo) => {
      const file = blobInfo.blob();
      const fileData = new File([file], blobInfo.filename(), {
        type: file.type,
      });
      const task = this.fileUploadService.uploadPublicFile(fileData);
      const promise = new Promise<string>((resolve, reject) => {
        task.subscribe({
          next: (res) => {
            if (res.url.includes('?')) {
              let url = res.url.split('?').shift();
              resolve(url);
            } else {
              resolve(res.url);
            }
          },
        });
      });
      return promise;
    },
  };
  category = '';
  id!: string;
  article!: Article;
  tags$!: Observable<Tags[]>;
  tagsLoading = false;
  tagsInput$ = new Subject<string>();
  selectedTags: Tags[] = <any>[];
  categories: Category[] = <any>[];
  selectedCategory = 0;
  fileupload!: Subscription;
  progress?: number;
  remainingTime?: number;
  constructor(
    private fileUploadService: FileUploadService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private tagsService: TagsService,
    private categoryService: CategoryService,
    private router: Router,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.showLoading = this.route.snapshot.data['isEditPage'];
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.isEdit = true;
        this.articleService.getArticleById(this.id).subscribe((response) => {
          this.article = new Article(response);
          this.title = this.article.title;
          this.selectedCategory = this.article.category;
          this.selectedTags = this.article.tagDetail || [];
          this.isPublished = this.article.isPublished;
          this.isUpcoming = this.article.isUpcoming;
          this.content = this.article.content;
          this.image = this.article.featuredImageUrl;
          this.showLoading = false;
        });
      }
    });
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res.results;
    });
    this.loadTags();
  }
  ngOnDestroy(): void {
    if (this.fileupload) {
      this.fileupload.unsubscribe();
    }
  }
  trackByFn(item: Tags) {
    return item.id;
  }

  loadTags() {
    this.tags$ = concat(
      of([]),
      this.tagsInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.tagsLoading = true)),
        switchMap((term) =>
          this.tagsService.getTags(term).pipe(
            catchError(() => of([])),
            map((response: any) => response.results),
            tap(() => {
              this.tagsLoading = false;
            })
          )
        )
      )
    );
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
  updateCroppedImage(croppedImage: any) {
    this.croppedImage = croppedImage;
  }
  clearImage() {
    this.image = '';
  }
  getStatus(): string {
    return this.isPublished
      ? 'Published'
      : this.isUpcoming
      ? 'Upcoming'
      : 'Draft';
  }
  updateStatus(status: string) {
    this.isPublished = status === 'Published';
    this.isUpcoming = status === 'Upcoming';
    if (status === 'Draft') {
      this.isPublished = false;
      this.isUpcoming = false;
    }
  }
  submitData() {
    let data: any = {};
    data['title'] = this.title;
    data['is_published'] = this.isPublished;
    data['is_upcoming'] = this.isUpcoming;
    data['content'] = this.content;
    data['category'] = this.selectedCategory;
    let tags = this.selectedTags.filter((tag) => !tag.id);

    if (tags.length === 0) {
      this.handleFileUpload(data);
      return;
    }

    let observables: Observable<any>[] = [];

    tags.forEach((res) => {
      observables.push(this.tagsService.createTag(res));
    });

    forkJoin(observables).subscribe((results) => {
      let tagId: any[] = [];
      results.forEach((result) => {
        tagId.push(result.id);
      });

      data['tags'] = tagId;

      this.handleFileUpload(data);
    });
  }

  private handleFileUpload(data: any) {
    this.fileupload = (
      this.croppedImage
        ? this.fileUploadService.uploadFile(this.croppedImage)
        : of({
            success: true,
            progress: 100,
          })
    ).subscribe({
      next: (res) => {
        if (res) {
          this.progress = res.progress;
          this.remainingTime = res.remainingTime;
          if (res.success) {
            data['featured_image'] = res.uuid;
            this.isEdit
              ? this.articleService
                  .updateArticle(this.id, { ...data })
                  .subscribe({
                    next: (res) => {
                      if (res) {
                        this.sharedService.showSuccessNotification('Success!');
                        this.router.navigate(['/admin/articles']);
                      }
                    },
                    error: (error: Error) => {
                      this.sharedService.showErrorNotification('Failed!');
                      throwError(() => error);
                    },
                  })
              : this.articleService.createArticle({ ...data }).subscribe({
                  next: (res) => {
                    if (res) {
                      this.sharedService.showSuccessNotification('Success!');
                      this.router.navigate(['/admin/articles']);
                    }
                  },
                  error: (error: Error) => {
                    this.sharedService.showErrorNotification('Failed!');
                    throwError(() => error);
                  },
                });
            this.progress = 0;
          }
          if (res.error) {
            this.progress = 0;
          }
        }
      },
      error: (error) => {
        this.progress = 0;
        throwError(() => error);
      },
    });
  }
}
