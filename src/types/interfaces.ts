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

export interface FormDataWithConvertedImage extends Omit<FormData, 'image'> {
  image: string;
}

export interface FormDataState {
  formDataStorage: FormDataWithConvertedImage[];
}

export interface CountryState {
  countryStorage: string[];
}
