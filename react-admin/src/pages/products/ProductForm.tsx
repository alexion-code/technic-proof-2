import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { SyntheticEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";

const ProductForm = (props: any) => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await axios.get(`products/${id}`);
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setPrice(data.price);
      })();
    }
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

      const data = {
        title,
        description,
        image,
        price,
      };
      if (id) await axios.put(`products/${id}`, data)
      else await axios.post("products", data);

    setRedirect(true);
  };

  useEffect(() => {
    if (redirect) return navigate("/");
  }, [redirect]);

  return (
    <Layout>
      <form onSubmit={submit}>
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
  );
};

export default ProductForm;
