export interface YoutubeProps {
  id: number;
  title: string;
  youtube_url: string;
  created_at: string;
  modified_at: string;
  is_enabled: boolean;
  is_featured: boolean;
  priority_index: number;
  checked: boolean;
}
export class Youtube {
  id: number;
  title: string;
  youtubeUrl: string;
  createdAt: string;
  modifiedAt: string;
  isEnabled: boolean;
  isFeatured: boolean;
  priorityIndex: number;
  checked: boolean;

  constructor({
    id,
    title,
    youtube_url,
    created_at,
    modified_at,
    is_enabled,
    is_featured,
    priority_index,
    checked,
  }: YoutubeProps) {
    this.id = id;
    this.title = title;
    this.youtubeUrl = youtube_url;
    this.createdAt = created_at;
    this.modifiedAt = modified_at;
    this.isEnabled = is_enabled;
    this.isFeatured = is_featured;
    this.priorityIndex = priority_index;
    this.checked = checked;
  }
}
