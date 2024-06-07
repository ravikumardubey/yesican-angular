import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Youtube } from 'src/app/core/models/youtube.model';
import { YoutubeService } from 'src/app/core/services/youtube.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit, OnDestroy {
  videos: Youtube[] = [];
  videoSubscription: Subscription;

  constructor(
    private sanitizer: DomSanitizer,
    private youtubeservice: YoutubeService
  ) {
    this.videoSubscription = this.youtubeservice.youtubeVideos$.subscribe(
      (videos) => {
        this.videos = videos;
      }
    );
  }
  ngOnInit(): void {
    this.youtubeservice.getAllYoutubeVideosForHome();
  }
  ngOnDestroy(): void {
    if (this.videoSubscription) {
      this.videoSubscription.unsubscribe();
    }
  }
  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  get hasNextPage(): boolean {
    return !!this.youtubeservice.youtubeVideosNextPage;
  }
  get showLoading(): boolean {
    return this.youtubeservice.showLoading.value;
  }

  loadMore() {
    this.youtubeservice.getAllYoutubeVideosForHome(true);
  }
}
