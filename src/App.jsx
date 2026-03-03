import { HeadProvider } from "react-head";
import Paths from "./routes/Paths";
import { CartProvider } from "./contexts/CartProvider";
import { UserProvider } from "./contexts/UsuarioProvider";
function App() {
  return (
    <HeadProvider>
      <UserProvider>
        <CartProvider>
          <Paths />
        </CartProvider>
      </UserProvider>
    </HeadProvider>
  );
}

export default App;