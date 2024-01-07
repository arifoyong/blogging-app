export interface MenuItem {
  id: string;
  label: string;
  path: string
}

export interface BlogFormData {
  title: string;
  description: string;
  imageUrl: string;
  category: string 
}

export interface Blog {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  userId: string;
  userImage: string;
  comments: string[];
}