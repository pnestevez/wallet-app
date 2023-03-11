import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Header from "./components/Header";
import Wallets from "./components/Wallets";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Header />
        <Wallets />
      </div>
    </DndProvider>
  );
}

export default App;
