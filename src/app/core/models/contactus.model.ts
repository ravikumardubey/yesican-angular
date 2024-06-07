export interface ContactProps {
  id: number;
  name: string;
  email: string;
  profession: string;
  dob: string;
  message: string;
  purpose: string;
  created_at: string;
  modified_at: string;
  checked: boolean;
}
export class Contact {
  id: number;
  name: string;
  email: string;
  profession: string;
  dob: string;
  message: string;
  purpose: string;
  createdAt: string;
  modifiedAt: string;
  checked: boolean;

  constructor({
    id,
    name,
    email,
    profession,
    dob,
    message,
    purpose,
    created_at,
    modified_at,
    checked,
  }: ContactProps) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.profession = profession;
    this.dob = dob;
    this.message = message;
    this.purpose = purpose;
    this.createdAt = created_at;
    this.modifiedAt = modified_at;
    this.checked = checked;
  }
}
