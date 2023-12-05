import RouteList from "./RouteList";
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';
import MainContainer from './components/MainContainer';
import useAppSelector from "./redux/typedUseSelectorHook";
import "./App.css";

function App() {
  const darkState = useAppSelector((state) => state.darkMode);

  return (
    <MainContainer dark={darkState.dark}>
      <Header />
      <div className="container">
        <RouteList />
      </div>
      <Footer />
    </MainContainer>
  );
}

export default App
