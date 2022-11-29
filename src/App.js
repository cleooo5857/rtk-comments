import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './libs/styles/global';
import { theme } from './libs/styles/theme';
import Router from './routes/Router';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Router />
            </ThemeProvider>
        </Provider>
    );
}
export default App;
