export interface ImageModelProps {
  id: number;
  author: string;
  image_url: string;
  image_category_detail: ImageCategoryDetail;
  title: string;
  created_at: string;
  modified_at: string;
  is_enabled: boolean;
  is_featured: boolean;
  category: number;
  image: string;
  checked: boolean;
}
export class ImageModel {
  id: number;
  author: string;
  imageUrl: string;
  imageCategoryDetail: ImageCategoryDetail;
  title: string;
  createdAt: string;
  modifiedAt: string;
  isEnabled: boolean;
  isFeatured: boolean;
  category: number;
  image: string;
  checked: boolean;
  constructor({
    id,
    author,
    image_url,
    image_category_detail,
    title,
    created_at,
    modified_at,
    is_enabled,
    is_featured,
    category,
    image,
    checked,
  }: ImageModelProps) {
    this.id = id;
    this.author = author;
    this.imageUrl = image_url;
    this.imageCategoryDetail = new ImageCategoryDetail(image_category_detail);
    this.title = title;
    this.createdAt = created_at;
    this.modifiedAt = modified_at;
    this.isEnabled = is_enabled;
    this.isFeatured = is_featured;
    this.category = category;
    this.image = image;
    this.checked = checked;
  }
}

export interface ImageCategoryDetailProps {
  id: number;
  name: string;
}
export class ImageCategoryDetail {
  id: number;
  name: string;
  constructor({ id, name }: ImageCategoryDetailProps) {
    this.id = id;
    this.name = name;
  }
}
