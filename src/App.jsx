import { HeadProvider } from "react-head";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Paths from "./routes/Paths";
import Categoria from "./components/Categoria";
import Depoimentos from "./components/Depoimentos";

function App() {
  return (
    <HeadProvider>
     <Categoria />
      <Depoimentos />
      <Paths />
    </HeadProvider>
  );
}

export default App;