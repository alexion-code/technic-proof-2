import axios from "axios";
import React, { Suspense, useLayoutEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Filters } from "../models/filters";
import { Product } from "../models/product";
const Products = React.lazy(() => import("./Products"));
const LayoutFrontend = React.lazy(() => import("../components/LayoutFrontend"));

const ProductsFrontend = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    s: "",
    sort: "",
    page: 1,
    itemsPerPage: 4,
  });
  const [lastPage, setLastPage] = useState(0);

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
    })();
  }, [filters]);

  return (
    <Suspense fallback={<Spinner />}>
      <LayoutFrontend>
        <Suspense fallback={<Spinner />}>
          <Products
            products={products}
            filters={filters}
            setFilters={setFilters}
            lastPage={lastPage}
          />
        </Suspense>
      </LayoutFrontend>
    </Suspense>
  );
};

export default ProductsFrontend;
