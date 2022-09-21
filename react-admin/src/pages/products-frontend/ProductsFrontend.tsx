import axios from "axios";
import React, { Suspense, useLayoutEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { Filters } from "../../models/filters";
import { Product } from "../../models/product";
import "./products-frontend.scss";
const Products = React.lazy(() => import("./ProductsItems"));
const LayoutFrontend = React.lazy(
  () => import("../../components/LayoutFrontend")
);

const ProductsFrontend = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    s: "",
    sort: "",
    page: 1,
    itemsPerPage: 6,
  });
  const [lastPage, setLastPage] = useState(0);
  const [totalItems, settotalItems] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useLayoutEffect(() => {
    (async () => {
      const arr = [];

      if (filters.s) {
        arr.push(`s=${filters.s}`);
      }

      if (filters.sort) {
        arr.push(`sort=${filters.sort}`);
      }

      if (filters.page) {
        arr.push(`page=${filters.page}`);
      }

      if (filters.itemsPerPage) {
        arr.push(`itemsperpage=${filters.itemsPerPage}`);
      }

      const { data } = await axios.get(`products?${arr.join("&")}`);

      setProducts(filters.page === 1 ? data.data : [...products, ...data.data]);
      setLastPage(data.last_page);
      settotalItems(data.total);
    })();
  }, [filters]);

  const search = (s: string) => {
    setSearchValue(s);
    setFilters({ ...filters, page: 1, s });
  };

  const sort = (sort: string) => {
    setFilters({ ...filters, page: 1, sort });
  };

  const load = () => {
    setFilters({ ...filters, page: filters.page + 1 });
  };

  const button = filters.page !== lastPage && (
    <div className="d-flex justify-content-center mt-4">
      <button className="btn btn-primary" onClick={load}>
        Load More
      </button>
    </div>
  );

  return (
    <Suspense fallback={<Spinner />}>
      <LayoutFrontend className="products-frontend">
        <section className="text-center container mb-5">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <input
                type="text"
                className="form-control mb-4"
                placeholder="Search"
                onChange={(e) => search(e?.target?.value)}
              />
              <p className="lead text-muted">{`${totalItems} Items found`}</p>
              <h1 className="fw-light">{`Search Results for "${searchValue}"`}</h1>
            </div>
          </div>
        </section>
        <div className="products-frontend__select mb-4 input-group">
          <select className="products-frontend__select-left form-select">
            <option>{`Productos (${totalItems ? totalItems : "0"})`}</option>
          </select>
          <select
            className="products-frontend__select-right form-select"
            onChange={(e) => sort(e?.target?.value)}
          >
            <option>ORDENAR POR</option>
            <option value="asc">Precio Ascendente</option>
            <option value="desc">Precio Descendente</option>
          </select>
        </div>
        <Suspense fallback={<Spinner />}>
          <Products
            products={products}
            filters={filters}
            setFilters={setFilters}
            lastPage={lastPage}
            totalItems={totalItems}
          />
        </Suspense>
        {button}
      </LayoutFrontend>
    </Suspense>
  );
};

export default ProductsFrontend;
