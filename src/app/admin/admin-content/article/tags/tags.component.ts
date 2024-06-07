import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';
import { Tags } from 'src/app/core/models/article.model';
import { SharedService } from 'src/app/core/services/shared.service';
import { TagsService } from 'src/app/core/services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit, OnDestroy {
  tags: Tags[] = [];
  showLoading = true;
  count!: number;
  page: number = 1;
  tagSubscription!: Subscription;
  countSubscription!: Subscription;
  searchText = '';
  isSearched = false;
  editTagName = '';
  newTag = '';
  selectedTag!: Tags;
  error = '';
  constructor(
    private tagsService: TagsService,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {
    this.tagSubscription = this.tagsService.tags$.subscribe((tags) => {
      this.tags = tags;
      if (this.tags) {
        this.showLoading = false;
      }
    });
    this.countSubscription = this.tagsService.count.subscribe((res) => {
      this.count = res;
    });
  }

  ngOnInit() {
    this.tagsService.getAllTags();
  }
  ngOnDestroy(): void {
    if (this.countSubscription) {
      this.countSubscription.unsubscribe();
    }
    if (this.tagSubscription) {
      this.tagSubscription.unsubscribe();
    }
  }
  searchTags() {
    if (this.searchText) {
      this.tagsService.searchQuery = this.searchText;
      this.tagsService.getAllTags(this.page.toString());
      this.isSearched = true;
    }
  }
  clearSearch() {
    this.searchText = '';
    this.tagsService.searchQuery = '';
    this.tagsService.getAllTags(this.page.toString());
    this.isSearched = false;
  }
  selectPage(page: number) {
    this.page = page;
    if (page) {
      this.showLoading = true;
      this.tagsService.getAllTags(this.page.toString());
    }
  }
  checkAllCheckBox(ev: any) {
    this.tags.forEach((x) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.tags && this.tags.length
      ? this.tags.every((p) => p.checked)
      : false;
  }
  editTag(item: any) {
    let name = '';
    if (!item.isEdit) {
      name = item.name;
    }
    item.isEdit = !item.isEdit;
  }
  openModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'md' });
  }
  openEditModal(content: any, item: Tags) {
    this.selectedTag = item;
    this.editTagName = item.name;
    this.modalService.open(content, { centered: true, size: 'md' });
  }
  createNewTag() {
    let data: any = {};
    data['name'] = this.newTag.trim();
    this.tagsService.getTags(this.newTag.trim()).subscribe((tag) => {
      if (
        (tag &&
          !tag.results.find(
            (result: any) => result.name === this.newTag.trim()
          )) ||
        (tag && tag.results.length === 0)
      ) {
        this.tagsService.createTag(data).subscribe((res) => {
          if (res) {
            this.newTag = '';
            this.tagsService.searchQuery = '';
            this.tagsService.getAllTags(this.page.toString());
            this.modalService.dismissAll();
          }
        });
      } else {
        this.error = 'Tag Already Exists';
        timer(3000).subscribe(() => {
          this.error = '';
        });
      }
    });
  }
  updateTag() {
    let data: any = {};
    data['name'] = this.editTagName.trim();
    if (this.selectedTag.name.trim() != this.editTagName.trim()) {
      this.tagsService.getTags(this.editTagName.trim()).subscribe((tag) => {
        if (
          (tag &&
            !tag.results.find(
              (result: any) => result.name === this.editTagName.trim()
            )) ||
          (tag && tag.results.length === 0)
        ) {
          this.tagsService
            .updateTag(this.selectedTag.id.toString(), data)
            .subscribe((res) => {
              if (res) {
                this.tags.filter((tag) => {
                  if (tag.id === this.selectedTag.id) {
                    tag.name = res.name;
                  }
                });
                this.modalService.dismissAll();
              }
            });
        } else {
          this.sharedService.showErrorNotification('Tag Already Exists');
          this.error = 'Tag Already Exists';
          timer(3000).subscribe(() => {
            this.error = '';
          });
        }
      });
    }
  }
  deleteTag(id: any) {
    this.tagsService.deleteTag(id).subscribe(() => {
      this.tagsService.getAllTags(this.page.toString());
    });
  }
}
