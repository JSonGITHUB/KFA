export interface App {
  id: string;
  name: string;
  icon: string;
  url: string;
  description: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  apps: string[]; // Array of app IDs
}
