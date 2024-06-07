import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';
import { Category } from 'src/app/core/models/article.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: Category[] = [];
  showLoading = true;
  count!: number;
  page: number = 1;
  categorySubscription!: Subscription;
  countSubscription!: Subscription;
  searchText = '';
  isSearched = false;
  editCategoryName = '';
  newCategory = '';
  selectedCategory!: Category;
  error = '';
  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal
  ) {
    this.categorySubscription = this.categoryService.categories$.subscribe(
      (categories) => {
        this.categories = categories;
        if (this.categories) {
          this.showLoading = false;
        }
      }
    );
    this.countSubscription = this.categoryService.count.subscribe((res) => {
      this.count = res;
    });
  }

  ngOnInit() {
    this.categoryService.getAllCategories();
  }
  ngOnDestroy(): void {
    if (this.countSubscription) {
      this.countSubscription.unsubscribe();
    }
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
  searchCategories() {
    if (this.searchText) {
      this.categoryService.searchQuery = this.searchText;
      this.categoryService.getAllCategories(this.page.toString());
      this.isSearched = true;
    }
  }
  clearSearch() {
    this.searchText = '';
    this.categoryService.searchQuery = '';
    this.categoryService.getAllCategories(this.page.toString());
    this.isSearched = false;
  }
  selectPage(page: number) {
    this.page = page;
    if (page) {
      this.showLoading = true;
      this.categoryService.getAllCategories(this.page.toString());
    }
  }
  checkAllCheckBox(ev: any) {
    this.categories.forEach((x) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.categories && this.categories.length
      ? this.categories.every((p) => p.checked)
      : false;
  }
  editCategory(item: any) {
    let name = '';
    if (!item.isEdit) {
      name = item.name;
    }
    item.isEdit = !item.isEdit;
  }
  openModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'md' });
  }
  openEditModal(content: any, item: Category) {
    this.selectedCategory = item;
    this.editCategoryName = item.name;
    this.modalService.open(content, { centered: true, size: 'md' });
  }
  createNewCategory() {
    let data: any = {};
    data['name'] = this.newCategory.trim();
    this.categoryService
      .getCategories(this.newCategory.trim())
      .subscribe((category) => {
        if (
          (category &&
            !category.results.find(
              (result: any) => result.name === this.newCategory.trim()
            )) ||
          (category && category.results.length === 0)
        ) {
          this.categoryService.createCategory(data).subscribe((res) => {
            if (res) {
              this.newCategory = '';
              this.categoryService.searchQuery = '';
              this.categoryService.getAllCategories(this.page.toString());
              this.modalService.dismissAll();
            }
          });
        } else {
          this.error = 'Category Already Exists';
          timer(3000).subscribe(() => {
            this.error = '';
          });
        }
      });
  }
  updateCategory() {
    let data: any = {};
    data['name'] = this.editCategoryName.trim();
    if (this.selectedCategory.name.trim() != this.editCategoryName.trim()) {
      this.categoryService
        .getCategories(this.editCategoryName.trim())
        .subscribe((category) => {
          if (
            (category &&
              !category.results.find(
                (result: any) => result.name === this.editCategoryName.trim()
              )) ||
            (category && category.results.length === 0)
          ) {
            this.categoryService
              .updateCategory(this.selectedCategory.id.toString(), data)
              .subscribe((res) => {
                if (res) {
                  this.categories.filter((category) => {
                    if (category.id === this.selectedCategory.id) {
                      category.name = res.name;
                    }
                  });
                  this.modalService.dismissAll();
                }
              });
          } else {
            this.error = 'Category Already Exists';
            timer(3000).subscribe(() => {
              this.error = '';
            });
          }
        });
    }
  }
  deleteCategory(id: any) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categoryService.getAllCategories(this.page.toString());
    });
  }
}
