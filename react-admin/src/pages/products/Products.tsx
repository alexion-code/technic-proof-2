import axios from "axios";
import React, { useEffect, useState } from "react";
import { Product } from "../../models/product";
import Layout from "../../components/Layout";
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

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("products");
      setProducts(data);
    })();
  }, []);

  const del = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`products/${id}`);

      setProducts((products) =>
        products.filter((product) => product.id !== id)
      );
    }
  };

  return (
    <Layout>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Button href={"/products/create"} variant="contained" color="primary">
          Add
        </Button>
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
                .slice(page * perPage, (page + 1) * perPage)
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell align="right">{product.id}</TableCell>
                    <TableCell align="left">
                      <img src={product.image} width={50} />
                    </TableCell>
                    <TableCell align="left">{product.title}</TableCell>
                    <TableCell align="left">{product.description}</TableCell>
                    <TableCell align="left">{product.price}</TableCell>
                    <TableCell align="right">
                      <ToggleButtonGroup>
                        <Button
                          variant="contained"
                          color="primary"
                          href={`/products/${product.id}/edit`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => del(product.id)}
                        >
                          Delete
                        </Button>
                      </ToggleButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter> */}

            {/* </TableFooter> */}
          </Table>
          <TablePagination
            component="div"
            style={{
              bottom: "0",
              position: "sticky",
              backgroundColor: "white",
            }}
            count={products.length}
            page={page}
            onPageChange={(
              e: React.MouseEvent<HTMLButtonElement> | null,
              newPage: number
            ) => setPage(newPage)}
            rowsPerPage={perPage}
            // onRowsPerPageChange={[]}
          />
        </TableContainer>
      </Paper>
    </Layout>
  );
};

export default Products;
