import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Youtube } from 'src/app/core/models/youtube.model';
import { YoutubeService } from 'src/app/core/services/youtube.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
})
export class YoutubeComponent {
  youtubeVideos: Youtube[] = [];
  count!: number;
  page: number = 1;
  tagSubscription!: Subscription;
  countSubscription!: Subscription;
  youtubeUrl = '';
  title = '';
  error = '';
  selectedYoutubeVideo!: Youtube;
  constructor(
    private youtubeService: YoutubeService,
    private modalService: NgbModal
  ) {
    this.tagSubscription = this.youtubeService.youtubeVideos$.subscribe(
      (videos) => {
        this.youtubeVideos = videos;
      }
    );
    this.countSubscription = this.youtubeService.count.subscribe((res) => {
      this.count = res;
    });
  }

  ngOnInit() {
    this.youtubeService.getAllYoutubeVideos();
  }
  ngOnDestroy(): void {
    if (this.countSubscription) {
      this.countSubscription.unsubscribe();
    }
    if (this.tagSubscription) {
      this.tagSubscription.unsubscribe();
    }
  }

  selectPage(page: number) {
    this.page = page;
    if (page) {
      this.youtubeService.showLoading.next(true);
      this.youtubeService.getAllYoutubeVideos(this.page.toString());
    }
  }
  checkAllCheckBox(ev: any) {
    this.youtubeVideos.forEach((x) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.youtubeVideos && this.youtubeVideos.length
      ? this.youtubeVideos.every((p) => p.checked)
      : false;
  }
  get showLoading(): boolean {
    return this.youtubeService.showLoading.value;
  }
  openModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'md' });
  }
  openEditModal(content: any, item: Youtube) {
    this.selectedYoutubeVideo = item;
    this.modalService.open(content, { centered: true, size: 'md' });
  }
  addYoutubeVideo() {
    let data: any = {};
    data['youtube_url'] = this.youtubeUrl.trim();
    data['title'] = this.title.trim();

    this.youtubeService.createYoutubeVideo(data).subscribe((res) => {
      if (res) {
        this.youtubeUrl = '';
        this.title = '';
        this.youtubeService.getAllYoutubeVideos(this.page.toString());
        this.modalService.dismissAll();
      }
    });
  }
  updateYoutubeVideoLink() {
    let data: any = {};
    data['title'] = this.selectedYoutubeVideo.title.trim();
    data['youtube_url'] = this.selectedYoutubeVideo.youtubeUrl.trim();
    let id = this.selectedYoutubeVideo.id.toString();

    this.youtubeService.updateYoutubeVideo(id, data).subscribe((res) => {
      if (res) {
        this.youtubeService.getAllYoutubeVideos(this.page.toString());
        this.modalService.dismissAll();
      }
    });
  }
  deleteYoutubeVideoLink(id: any) {
    this.youtubeService.deleteYoutubeVideo(id).subscribe(() => {
      this.youtubeService.getAllYoutubeVideos(this.page.toString());
    });
  }
}
