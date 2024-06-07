export interface ArticleProps {
  id: number;
  comments: any[];
  featured_image_url: string;
  category_detail: Category;
  tag_detail: Tags[];
  author: string;
  title: string;
  content: string;
  created_at: string;
  modified_at: string;
  is_published: boolean;
  is_upcoming: boolean;
  category: number;
  featured_image: string;
  tags: number[];
  checked: boolean;
}

export interface CategoryProps {
  id: number;
  name: string;
  checked: boolean;
  isEdit: boolean;
}
export class Category {
  id: number;
  name: string;
  checked: boolean;
  isEdit: boolean;
  constructor({ id, name, checked, isEdit }: CategoryProps) {
    this.id = id;
    this.name = name;
    this.checked = checked;
    this.isEdit = isEdit;
  }
}

export interface TagsProps {
  id: number;
  name: string;
  checked: boolean;
  isEdit: boolean;
}
export class Tags {
  id: number;
  name: string;
  checked: boolean;
  isEdit: boolean;
  constructor({ id, name, checked, isEdit }: TagsProps) {
    this.id = id;
    this.name = name;
    this.checked = checked;
    this.isEdit = isEdit;
  }
}

export class Article {
  id: number;
  comments?: any[];
  featuredImageUrl: string;
  categoryDetail: Category;
  tagDetail: Tags[];
  author: string;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  isPublished: boolean;
  isUpcoming: boolean;
  category: number;
  featuredImage: string;
  tags: number[];
  checked: boolean;
  constructor({
    id,
    comments,
    featured_image_url,
    category_detail,
    tag_detail,
    author,
    title,
    content,
    created_at,
    modified_at,
    is_published,
    is_upcoming,
    category,
    featured_image,
    tags,
    checked,
  }: ArticleProps) {
    this.id = id;
    this.comments = comments;
    this.featuredImageUrl = featured_image_url;
    this.categoryDetail = category_detail;
    this.tagDetail = tag_detail;
    this.author = author;
    this.title = title;
    this.content = content;
    this.createdAt = created_at;
    this.modifiedAt = modified_at;
    this.isPublished = is_published;
    this.isUpcoming = is_upcoming;
    this.category = category;
    this.featuredImage = featured_image;
    this.tags = tags;
    this.checked = checked;
  }
}
