export interface MagazineProps {
  id: number;
  author: string;
  image_url: string;
  magazine_url: string;
  title: string;
  created_at: string;
  modified_at: string;
  is_enabled: boolean;
  is_featured: boolean;
  priority_index: number;
  magazine: any;
  image: any;
  checked: boolean;
}
export class Magazine {
  id: number;
  author: string;
  imageUrl: string;
  magazineUrl: string;
  title: string;
  createdAt: string;
  modifiedAt: string;
  isEnabled: boolean;
  isFeatured: boolean;
  priorityIndex: number;
  magazine: any;
  image: any;
  checked: boolean;
  constructor({
    id,
    author,
    image_url,
    magazine_url,
    title,
    created_at,
    modified_at,
    is_enabled,
    is_featured,
    priority_index,
    magazine,
    image,
    checked,
  }: MagazineProps) {
    this.id = id;
    this.author = author;
    this.imageUrl = image_url;
    this.magazineUrl = magazine_url;
    this.title = title;
    this.createdAt = created_at;
    this.modifiedAt = modified_at;
    this.isEnabled = is_enabled;
    this.isFeatured = is_featured;
    this.priorityIndex = priority_index;
    this.magazine = magazine;
    this.image = image;
    this.checked = checked;
  }
}
