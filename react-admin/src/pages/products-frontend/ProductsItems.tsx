import React, { useState } from "react";
import { Filters } from "../../models/filters";
import { Product } from "../../models/product";
import "./products-items.scss";

const Products = (props: {
  products: Product[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  lastPage: number;
  totalItems: number;
}) => {
  const [selected, setSelected] = useState<number[]>([]);

  const select = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  const heartSelect = (select: boolean) =>
    !select ? (
      <svg
        className="products-items__image-card-svg"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 471.701 471.701"
        fill="#202020"
      >
        <path
          d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
		c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
		l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
		C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
		s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
		c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
		C444.801,187.101,434.001,213.101,414.401,232.701z"
        />
      </svg>
    ) : (
      <svg
        className="products-items__image-card-svg"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="47px"
        height="47px"
        viewBox="0 0 15 15"
        fill="#202020"
      >
        <path d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" />
      </svg>
    );

  return (
    <div className="products-items">
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 g-3">
        {props.products.map((product, index) => (
          <div
            className="col"
            key={product.id}
            onClick={() => select(product.id)}
          >
            <div
              className={`card shadow-sm ${
                selected.some((s) => s === product.id) ? "selected" : ""
              }`}
            >
              <div className="products-items__image-card">
                {heartSelect(selected.some((s) => s === product.id))}
              </div>
              <img
                className="products-items__image-card-img"
                src={product.image}
                alt={`product-${product.id}`}
              />
              <div className="card-body">
                <p className="card-text">{product.title}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{`${product.price} €`}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
