import { useState, useEffect } from "react";
import Categoria from "./components/Categoria";
import CategoryCarousel from "./components/CategoryCarousel";
import Depoimentos from "./components/Depoimentos";
// import ShippingSection from "../../components/ShippingSection";
import { AXIOS } from "../../services";
import { Title } from "react-head";
import BannerSection from "./components/BannerSection";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await AXIOS.get("/api/categories");
                setCategories(response.data);
            } catch (err) {
                console.error("Erro ao buscar categorias:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    return (
        <main>
            <Title>Home - 3Dtech</Title>
            <div>
                <BannerSection />
                <Categoria />
                {!loading && categories.length > 0 ? (
                    <div>
                        {categories.slice(0, 2).map((category) => (
                            <CategoryCarousel
                                key={category.id}
                                categoryId={category.id}
                                categoryName={category.nome}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center font-bold">Carregando produtos...</div>
                )
            }

                <Depoimentos />

            </div>
        </main>
    );
}

export default Home;