export interface SubscriberProps {
  id: number;
  email: string;
  created_at: string;
  modified_at: string;
  is_blocked: string;
  checked: boolean;
}

export class Subscriber {
  id: number;
  email: string;
  createdAt: string;
  modifiedAt: string;
  isBlocked: string;
  checked: boolean;
  constructor({
    id,
    email,
    created_at,
    modified_at,
    is_blocked,
    checked,
  }: SubscriberProps) {
    this.id = id;
    this.email = email;
    this.createdAt = created_at;
    this.modifiedAt = modified_at;
    this.isBlocked = is_blocked;
    this.checked = checked;
  }
}
