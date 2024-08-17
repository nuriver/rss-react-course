export interface FormData {
  name: string;
  password: string;
  age: number;
  confirmPassword: string;
  gender: 'male' | 'female';
  country: string;
  image: FileList;
  tnc: boolean;
}

export interface FormDataState {
  formDataStorage: FormData[];
}

export interface CountryState {
  countryStorage: string[];
}
