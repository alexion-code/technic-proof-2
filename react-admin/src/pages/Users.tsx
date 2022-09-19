import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { User } from "../models/user";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("users");
      setUsers(data);
    })();
  }, []);

  return (
    <div>
      <Layout>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * perPage, (page + 1) * perPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="right">{user.id}</TableCell>
                  <TableCell align="left">
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            // style={{ bottom: "0", position: "fixed" }}
            count={users.length}
            page={page}
            onPageChange={(
              e: React.MouseEvent<HTMLButtonElement> | null,
              newPage: number
            ) => setPage(newPage)}
            rowsPerPage={perPage}
            // onRowsPerPageChange={[]}
          />
        </TableContainer>
      </Layout>
    </div>
  );
};

export default Users;
