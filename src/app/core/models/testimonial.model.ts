export interface TestimonialProps {
  id: number;
  client_name: string;
  client_title: string;
  content: string;
  created_at: string;
  modified_at: string;
  checked: boolean;
}

export class Testimonial {
  id: number;
  clientName: string;
  clientTitle: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  checked: boolean;

  constructor({
    id = 0,
    client_name = '',
    client_title = '',
    content = '',
    created_at = '',
    modified_at = '',
    checked = false,
  }: Partial<TestimonialProps> = {}) {
    this.id = id;
    this.clientName = client_name;
    this.clientTitle = client_title;
    this.content = content;
    this.createdAt = created_at;
    this.modifiedAt = modified_at;
    this.checked = checked;
  }
}
