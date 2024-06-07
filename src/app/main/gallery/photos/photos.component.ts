import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbCarousel, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import {
  ImageCategoryDetail,
  ImageModel,
} from 'src/app/core/models/gallery.model';
import { GalleryCategoryService } from 'src/app/core/services/gallery-category.service';
import { GalleryService } from 'src/app/core/services/gallery.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit, OnDestroy {
  imageHeight!: string;
  imageWidth!: string;
  imageViewer!: boolean;
  activeID: number = 0;
  @ViewChild('carousel') carousel!: NgbCarousel;
  @ViewChild('middle') middle!: ElementRef<HTMLDivElement>;
  images: ImageModel[] = [];
  categories: ImageCategoryDetail[] = [];
  imageSubscription: Subscription;
  categorySubscription: Subscription;
  activeNavTab = 0;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private galleryService: GalleryService,
    private categoryService: GalleryCategoryService
  ) {
    this.imageSubscription = this.galleryService.images$.subscribe((res) => {
      if (res) {
        this.images = res;
      }
    });
    this.categorySubscription = this.categoryService.categories$.subscribe(
      (res) => {
        if (res) {
          this.categories = res;
          this.activeNavTab = this.categories[0].id;
          this.galleryService.selectedCategory.next(
            this.categories[0].id.toString()
          );
          this.galleryService.getImages();
        }
      }
    );
  }
  ngOnInit(): void {
    this.categoryService.getAllCategories();
  }

  ngOnDestroy(): void {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
  updateCategory(id: number) {
    this.galleryService.selectedCategory.next(id.toString());
    this.images = [];
    this.galleryService.showLoading.next(true);
    this.galleryService.getImages();
  }
  slide(ngbSlideEvent: NgbSlideEvent) {
    var len = this.images.length;
    if (ngbSlideEvent.source == 'arrowRight') {
      this.setActiveId((this.activeID + 1) % len);
    }
    if (ngbSlideEvent.source == 'arrowLeft') {
      this.setActiveId((this.activeID + len - 1) % len);
    }
  }

  async showImageViewer(i: any) {
    this.imageViewer = true;
    this.document.body.classList.add('no-scroll');
    this.activeID = i;
    await this.waitForElement();
    this.imageHeight = this.middle.nativeElement.offsetHeight.toString();
    this.imageWidth = this.middle.nativeElement.offsetWidth.toString();
  }

  async waitForElement() {
    while (!this.middle) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  closeImageViewer(): void {
    this.imageViewer = false;
    this.document.body.classList.remove('no-scroll');
  }
  setActiveId(id: any) {
    if (this.carousel) {
      this.activeID = id;
      this.carousel.select('ngb-slide-' + id.toString());
    }
  }
  get hasNextPage(): boolean {
    return !!this.galleryService.imagesNextPage;
  }
  get showLoading(): boolean {
    return this.galleryService.showLoading.value;
  }

  loadMore() {
    this.galleryService.getImages(true);
  }
}
