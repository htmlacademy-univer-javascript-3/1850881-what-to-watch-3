import {MainPage, MainScreenProps} from '../../pages/main-page/main-page.tsx';

type AppProps = MainScreenProps;

export function App(props: AppProps) {
  return (
    <MainPage {...props}/>
  );
}
