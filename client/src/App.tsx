import RouteList from "./RouteList";
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';
import MainContainer from './components/MainContainer';
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
    const darkState = useSelector((state: RootState) => state.darkMode);

    const style = {
        backgroundColor: darkState.dark ? '#05172b' : '#4186D3',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
    };

    return (
        <div style={style}>
            <MainContainer dark={darkState.dark}>
                <Header />
                <RouteList />
                <Footer />
            </MainContainer>
        </div>
    );
}

export default App
