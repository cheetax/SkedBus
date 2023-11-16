export type RootStackParamList = {
  Main: {name?: string, params?: {key: string}};
  Form: {key: string, name?: string, params?: {key?: string}}
  FormNavigate: {name?: string, screen: string, initial: boolean, params?: {key: string}}
  FormOdometer: {name?: string, params?: {key: string}}
  FormExpenses: {name: string}
  ListOdometer: {name?: string, params?: {key: string}}
  List: {name: string};
  Chart: {name?: string, params?: {key: string}};
};

export type ButtonTabParamList = {
  List: {name: string};
  Chart: {name?: string, params?: {key: string}};
}