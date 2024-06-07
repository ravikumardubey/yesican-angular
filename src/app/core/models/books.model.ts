export interface BookProps {
  id: number;
  image_url: string;
  title: string;
  publisher: string;
  publish_date: string;
  cart_url: string;
  created_at: string;
  modified_at: string;
  is_enabled: boolean;
  is_featured: boolean;
  priority_index: number;
  language: string;
  image: string;
  checked: boolean;
}
export class Book {
  id: number;
  imageUrl: string;
  title: string;
  publisher: string;
  publishDate: string;
  cartUrl: string;
  createdAt: string;
  modifiedAt: string;
  isEnabled: boolean;
  isFeatured: boolean;
  language: string;
  priorityIndex: number;
  image: string;
  checked: boolean;
  constructor({
    id = 0,
    image_url = '',
    title = '',
    publisher = '',
    publish_date = '',
    cart_url = '',
    created_at = '',
    modified_at = '',
    is_enabled = false,
    is_featured = false,
    priority_index = 0,
    language = '',
    image = '',
    checked = false,
  }: Partial<BookProps> = {}) {
    this.id = id;
    this.title = title;
    this.language = language;
    this.image = image;
    this.cartUrl = cart_url;
    this.publisher = publisher;
    this.publishDate = publish_date;
    this.imageUrl = image_url;
    this.isEnabled = is_enabled;
    this.isFeatured = is_featured;
    this.createdAt = created_at;
    this.modifiedAt = modified_at;
    this.priorityIndex = priority_index;
    this.checked = checked;
  }
}
