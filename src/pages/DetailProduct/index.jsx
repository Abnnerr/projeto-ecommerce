
import { Title } from "react-head";
import DetailProduct from "./DetailProduct";

export default function PageDatailProduct({nome}) {
    return (
        <>
            <Title>{`3Dtech - ${nome}`}</Title>
            <DetailProduct />
        </>
    );
}