export interface FormData {
  name: string;
  password: string;
  age: number;
  email: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  country: string;
  image: FileList;
  tnc: boolean;
}

export interface FormDataWithConvertedImage
  extends Omit<FormData, 'image' | 'tnc' | 'age'> {
  image: string;
  tnc?: boolean;
  age: string | number;
}

export interface FormDataState {
  formDataStorage: FormDataWithConvertedImage[];
}

export interface CountryState {
  countryStorage: string[];
}

export type Gender = 'male' | 'female';
