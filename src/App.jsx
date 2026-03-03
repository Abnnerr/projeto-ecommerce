import { HeadProvider } from "react-head";
import Paths from "./routes/Paths";

function App() {
  return (
    <HeadProvider>
      <Paths />
    </HeadProvider>
  );
}

export default App;