import * as React from "react";
import { Modal, Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function OrderModal({
  open,
  handleClose,
  selectedOrderProducts,
  data,
}) {
  const ccyFormat = (num: number | undefined) =>
    num ? Number(num).toFixed(2) : "0.00";
  let subTotal = 0;
  let discount = 0;
  selectedOrderProducts.forEach((product) => {
    subTotal += product.quantity * product.price;
  });

  return (
    <Modal
      open={open}
      className="text-black"
      onClose={handleClose}
      aria-labelledby="modal-title"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6">
          Order Products
        </Typography>
        {selectedOrderProducts.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="order products table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrderProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">
                      Rs. {ccyFormat(product.price)}
                    </TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">
                      Rs. {ccyFormat(product.quantity * product.price)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>SubTotal: </TableCell>
                  <TableCell align="right">Rs. {subTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell>Discount: </TableCell>
                  <TableCell align="right">{discount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell>Delivery Charge: </TableCell>
                  <TableCell align="right">
                    {data?.deliveryCharge || 0}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Total:</TableCell>
                  <TableCell align="right">
                    Rs. {data?.totalAmount - discount}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No products found.</Typography>
        )}
      </Box>
    </Modal>
  );
}
