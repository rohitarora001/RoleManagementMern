import React from "react";
import GetAllProducts from "./GetAllProducts";
const AllProducts = () => {

return (
    <>
        <div>
            <div style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h1>
                    All Products
                </h1>
            </div>
            <div style={{
                display: "flex",
                margin: "10px"
            }}>
                <GetAllProducts />
            </div>
        </div>
    </>
)
}

export default AllProducts
