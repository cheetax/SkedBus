export type RootStackParamList = {
  Main: {name?: string, params?: {key: string}};
  Form: {key: string, name?: string, params?: {key?: string}}
  FormNavigate: {name?: string, screen: string, initial: boolean, params?: {key: string}}
  FormOdometer: {name?: string, key:string}
  FormExpenses: {name: string}
  Maps: {name?: string, key?: string, params?: {key: string}}
  Sheduler: {name: string,};
  Chart: {name?: string, params?: {key: string}};
  FormProfile: {name: string};
  DrawerItem: {name: string};
};

export type ButtonTabParamList = {
  Sheduler: {name: string, key: string, component: {}};
  Maps: {name?: string, params?: {key: string}};
}