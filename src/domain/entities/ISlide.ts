export type ISlide = {
  id: string; 
  title: string; 
  imageUrl: string;
  subtitle?: string;
  cta?: { label: string; href: string; target?: "_self" | "_blank" };
  order: number; isActive: boolean;
  activeFrom?: string; activeTo?: string;
};
