interface ImageFile {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}

export interface PropertiesProps {
  [key: string]: any;
  type: string;
  name: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: string;
  baths: string;
  square_feet: string;
  amenities: string[]; // Specify the type of amenities as string[]
  rates: {
    weekly: string;
    monthly: string;
    nightly: string;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };

  images?: ImageFile[];
}
