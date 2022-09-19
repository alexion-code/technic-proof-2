import React, { useState } from "react";
import { Filters } from "../models/filters";
import { Product } from "../models/product";
import "./products.scss";

const Products = (props: {
  products: Product[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  lastPage: number;
}) => {
  const [selected, setSelected] = useState<number[]>([]);

  const search = (s: string) => {
    props.setFilters({ ...props.filters, page: 1, s });
  };

  const sort = (sort: string) => {
    props.setFilters({ ...props.filters, page: 1, sort });
  };

  const load = () => {
    props.setFilters({ ...props.filters, page: props.filters.page + 1 });
  };

  const select = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  const button = props.filters.page !== props.lastPage && (
    <div className="d-flex justify-content-center mt-4">
      <button className="btn btn-primary" onClick={load}>
        Load More
      </button>
    </div>
  );

  return (
    <>
      <div className="col-md-12 mb-4 input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={(e) => search(e?.target?.value)}
        />
        <div className="input-group-append">
          <select
            className="form-select"
            style={{ cursor: "pointer" }}
            onChange={(e) => sort(e?.target?.value)}
          >
            <option>ORDENAR POR</option>
            <option value="asc">Precio Ascendente</option>
            <option value="desc">Precio Descendente</option>
          </select>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
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
              <img
                src={product.image}
                height={200}
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
      {button}
    </>
  );
};

export default Products;
