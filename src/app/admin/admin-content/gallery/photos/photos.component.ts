import { Component, OnDestroy, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/core/services/gallery.service';
import {
  ImageCategoryDetail,
  ImageModel,
} from 'src/app/core/models/gallery.model';
import { SharedService } from 'src/app/core/services/shared.service';
import { Subscription } from 'rxjs';
import { GalleryCategoryService } from 'src/app/core/services/gallery-category.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit, OnDestroy {
  images: ImageModel[] = [];
  categories: ImageCategoryDetail[] = [];
  addImage!: boolean;
  imageSubscription: Subscription;
  categorySubscription: Subscription;
  selectedCategory = '';
  constructor(
    private galleryService: GalleryService,
    private sharedService: SharedService,
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
        }
      }
    );
  }
  ngOnInit(): void {
    this.categoryService.getAllCategories();
    this.galleryService.getImages();
  }
  ngOnDestroy(): void {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
  checkAllCheckBox(ev: any) {
    this.images.forEach((x) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.images && this.images.length
      ? this.images.every((p) => p.checked)
      : false;
  }

  showImageAdd() {
    this.addImage = true;
  }
  hideImageAdd(event: any) {
    this.addImage = false;
  }
  deletePhoto(id: any) {
    this.galleryService.deleteImage(id).subscribe(() => {
      this.sharedService.showSuccessNotification('Image Deleted');
      this.images = this.images.filter((res) => res.id != id);
    });
  }
  get hasNextPage(): boolean {
    return !!this.galleryService.imagesNextPage;
  }
  get showLoading(): boolean {
    return this.galleryService.showLoading.value;
  }
  updateCategory(category: ImageCategoryDetail) {
    this.selectedCategory = category.name;
    this.galleryService.selectedCategory.next(category.id.toString());
    this.images = [];
    this.galleryService.showLoading.next(true);
    this.galleryService.getImages();
  }
  reset() {
    this.selectedCategory = '';
    this.galleryService.selectedCategory.next('');
    this.galleryService.getImages();
  }
  changeImageCategory(id: number, category: ImageCategoryDetail) {
    let data: any = {};
    data['category'] = category.id;
    this.galleryService.updateImage(id.toString(), data).subscribe((res) => {
      this.sharedService.showSuccessNotification('Image Category Updated!');
      this.images.filter((item) => {
        if (item.id === id) {
          item.imageCategoryDetail = category;
        }
      });
    });
  }
  loadMore() {
    this.galleryService.getImages(true);
  }
}
