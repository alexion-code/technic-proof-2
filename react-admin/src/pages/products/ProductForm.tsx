import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { Suspense, SyntheticEvent, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
const Layout = React.lazy(() => import("../../components/Layout"));

const ProductForm = (props: any) => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");

  useLayoutEffect(() => {
    if (id) {
      (async () => {
        const { data } = await axios.get(`products/${id}`);
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setPrice(data.price);
      })();
    }
  }, [id]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      title,
      description,
      image,
      price,
    };
    if (id) await axios.put(`products/${id}`, data);
    else await axios.post("products", data);

    navigate("/admin/products");
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Layout>
        <form onSubmit={submit} className="mt-4">
          <div className="mb-3">
            <TextField
              value={title}
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              value={description}
              label="Description"
              multiline
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              value={image}
              label="Image"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              value={price}
              label="Price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Layout>
    </Suspense>
  );
};

export default ProductForm;
