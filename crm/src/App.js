import logo from "./logo.svg";
import { Page } from "./page";
import { data } from "./content";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Page content={data} />
    </div>
  );
}

export default App;
