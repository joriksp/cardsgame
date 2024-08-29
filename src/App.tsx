import GameField from "./components/shared/GameField";
import Header from "./components/shared/Header";
import Navbar from "./components/shared/Navbar";

function App() {
   return (
      <div className="root">
         <Header title="Top NavBar" />
         <GameField />
         <Navbar />
      </div>
   );
}

export default App;
