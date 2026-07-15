"use client";

import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import api from "config/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button, MenuItem, Menu, IconButton } from "@mui/material";
import { Ellipsis, MoreVertical } from "lucide-react";
import { MouseEvent, useMemo, useState } from "react";
import OrderModal from "client/components/OpenModal";
import { toast } from "sonner";

// --- Fetch function ---
const fetchOrders = async () => {
  const { data } = await api.get("/order"); // GET /order
  return data;
};

const OrderPage: NextPage = () => {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedOrderProducts, setSelectedOrderProducts] = useState([]);
  const [productsDialogOpen, setProductsDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const handleOpen = (products) => {
    setSelectedOrderProducts(products);
    setOpen(true);
    setProductsDialogOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    orderId: string,
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedOrderId(null);
  };

  const handleStatusMenuOpen = (event) => {
    setStatusMenuAnchor(event.currentTarget);
  };

  const handleOrderAction = async (orderId, action) => {
    try {
      // const orderToEdit = orders.find(
      //   (order) => order._id.slice(-5) === orderId,
      // );

      // if (!orderToEdit) {
      //   console.error("No matching order found!");
      //   toast.error("Order not found.");
      //   return;
      // }

      let status = "";
      switch (action) {
        case "paid":
          status = "paid";
          break;
        case "pending":
          status = "pending";
          break;
        case "delivered":
          status = "delivered";
          break;
        case "decline":
          status = "failed";
          break;
        default:
          return;
      }

      const response = await api.put(`/order/status/${orderId}`, {
        status,
      });

      if (response.data.success) {
        toast.success(`Order ${action} successfully!`, {
          duration: 1000,
          onAutoClose: () => window.location.reload(),
        });

        // // Update both orders and rows states
        // setOrders((prevOrders) =>
        //   prevOrders.map((order) =>
        //     order._id === orderToEdit._id ? { ...order, status } : order,
        //   ),
        // );

        // setRows((prevRows) =>
        //   prevRows.map((row) =>
        //     row.id === orderId ? { ...row, status } : row,
        //   ),
        // );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  // Sort and add serial number
  const orders = useMemo(() => {
    if (!data?.orders) return [];

    return (
      [...data.orders]
        // sort by createdAt descending (latest first)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        // map to include serial number
        .map((order, index) => ({
          ...order,
          serial: index + 1,
        }))
    );
  }, [data]);

  // Define DataGrid columns
  const columns: GridColDef[] = [
    { field: "serial", headerName: "S.N.", width: 80 },
    { field: "userName", headerName: "Customer Name", flex: 1 },
    { field: "userPhone", headerName: "Phone Number", flex: 1 },
    { field: "userAddress", headerName: "Address", flex: 1 },
    { field: "createdAt", headerName: "Date", flex: 1 },
    {
      field: "items",
      headerName: "Items",
      width: 140,
      renderCell: (params) => (
        <Button
          variant="text"
          // color="#fff"
          size="small"
          onClick={() => {
            setSelectedRowData(params.row);
            handleOpen(params.row.products);
          }}
        >
          {params.row.products.length} Items
        </Button>
      ),
    },
    { field: "totalAmount", headerName: "Total Amount", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },

    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleMenuOpen(e, params.row._id)}>
            <Ellipsis style={{ color: "#000000ff" }} />
          </IconButton>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem onMouseEnter={handleStatusMenuOpen}>Edit Status</MenuItem>
            {/* <MenuItem
              onClick={() => handleOrderAction(params.row.id, "editProducts")}
            >
              Edit Info
            </MenuItem> */}
          </Menu>

          <Menu
            anchorEl={statusMenuAnchor}
            open={Boolean(statusMenuAnchor)}
            onClose={() => setStatusMenuAnchor(null)}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                handleOrderAction(selectedOrderId, "paid");
              }}
            >
              Paid
            </MenuItem>
            <MenuItem
              onClick={() => handleOrderAction(selectedOrderId, "pending")}
            >
              Pending
            </MenuItem>
            <MenuItem
              onClick={() => handleOrderAction(selectedOrderId, "delivered")}
            >
              Delivered
            </MenuItem>
            <MenuItem
              onClick={() => handleOrderAction(selectedOrderId, "decline")}
            >
              Decline
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  if (isLoading) return <div className="text-white p-4">Loading...</div>;
  if (isError)
    return <div className="text-red-500 p-4">Failed to load orders</div>;

  return (
    <div className="p-4 bg-stone-800 min-h-dvh rounded-[2%] pt-16 mx-2 text-white overflow-x-auto">
      <div className="mb-18" />
      <Paper
        sx={{
          height: 450,
          width: "100%",
          bgcolor: "#292524",
          p: 2,
          borderRadius: 2,
        }}
      >
        <DataGrid
          rows={orders}
          columns={columns}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </Paper>

      <OrderModal
        open={open}
        handleClose={handleClose}
        data={selectedRowData}
        selectedOrderProducts={selectedOrderProducts}
      />
    </div>
  );
};

// Row actions
const RowActions = ({ id }: { id: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertical size={18} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => alert(`View ${id}`)}>View</MenuItem>
        <MenuItem onClick={() => alert(`Edit ${id}`)}>Edit</MenuItem>
        <MenuItem onClick={() => alert(`Delete ${id}`)}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default OrderPage;
