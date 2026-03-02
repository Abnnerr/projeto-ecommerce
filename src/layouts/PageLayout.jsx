import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";


const PageLayout = () => {
    return ( 
        <div>
            <Header/>
            <div>
                <Outlet/>
           
            </div>
          
            <Footer/>
        </div>
     );
}
 
export default PageLayout;