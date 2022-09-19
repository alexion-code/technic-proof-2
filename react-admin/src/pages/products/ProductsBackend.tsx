import axios from "axios";
import React, { Suspense, useLayoutEffect, useState } from "react";
import { Product } from "../../models/product";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { Paper, TableContainer, ToggleButtonGroup } from "@mui/material";
import { Filters } from "../../models/filters";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
const Layout = React.lazy(() => import("../../components/Layout"));

const ProductsBackend = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    s: "",
    sort: "",
    page: 1,
    itemsPerPage: 4,
  });

  useLayoutEffect(() => {
    (async () => {
      const arr = [];

      if (filters.s) {
        arr.push(`s=${filters.s}`);
      }

      if (filters.sort) {
        arr.push(`sort=${filters.sort}`);
      }

      const { data } = await axios.get(`products?${arr.join("&")}`);
      setProducts(data.data);
    })();
  }, [filters]);

  const search = (s: string) => {
    setFilters({ ...filters, page: 1, s });
  };

  const sort = (sort: string) => {
    setFilters({ ...filters, page: 1, sort });
  };

  const del = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`products/${id}`);

      setProducts((products) =>
        products.filter((product) => product.id !== id)
      );
    }
  };

  const edit = (id: number) => {
    navigate(`/admin/products/${id}/edit`);
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Layout>
        <div className="pt-3 pb-2 mb-3 border-bottom">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin/products/create")}
          >
            Add
          </Button>
        </div>
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
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "calc(100vh - 48px)" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">#</TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice(
                    page * filters.itemsPerPage,
                    (page + 1) * filters.itemsPerPage
                  )
                  .map((product) => (
                    <TableRow key={product.id}>
                      <TableCell align="right">{product.id}</TableCell>
                      <TableCell align="left">
                        <img
                          src={product.image}
                          width={50}
                          alt={`product-${product.id}`}
                        />
                      </TableCell>
                      <TableCell align="left">{product.title}</TableCell>
                      <TableCell align="left">{product.description}</TableCell>
                      <TableCell align="left">{product.price}</TableCell>
                      <TableCell align="right">
                        <ToggleButtonGroup>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => edit(product.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => del(product.id)}
                            style={{ marginLeft: 10 }}
                          >
                            Delete
                          </Button>
                        </ToggleButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              style={{
                bottom: "0",
                position: "fixed",
                backgroundColor: "white",
              }}
              count={products.length}
              page={page}
              onPageChange={(
                e: React.MouseEvent<HTMLButtonElement> | null,
                newPage: number
              ) => setPage(newPage)}
              rowsPerPage={filters.itemsPerPage}
            />
          </TableContainer>
        </Paper>
      </Layout>
    </Suspense>
  );
};

export default ProductsBackend;
