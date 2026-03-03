import Categoria from "../components/Categoria";
import Depoimentos from "../components/Depoimentos";
import ShippingSection from "../components/ShippingSection";

const Home = () => {
    return (
        <main>
            <div>
                <Categoria />
                <Depoimentos />
                {/* <ShippingSection /> */}
            </div>
        </main>
    );
}

export default Home;