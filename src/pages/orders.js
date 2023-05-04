import React, { useState } from "react";
import {
  Box,
  Card,
  Chip,
  Container,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@apollo/react-hooks";
import { GET_ORDERS } from "../operations/queries/getOrders";
import { useParams } from "react-router-dom";
import UserElement from "../components/admin_panel/users/UserElement";
import { GET_USER } from "../operations/queries/getUser";
import OrderStatusSelector from "../components/admin_panel/OrderStatusSelector";

const BoxStyle = {
  margin: "25px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-center",
  alignContent: "center",
};
const ContainerStyle = {
  flexBasis: "50%",
};
const CardStyle = {};
const TableContainerStyle = {
  marginTop: "10px",
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(undefined);
  const userId = parseInt(useParams().userId);

  const { refetch } = useQuery(GET_ORDERS, {
    variables: {
      userId: !isNaN(userId) ? userId : undefined, // Передать userId аргументом, если есть в роуте
    },
    onCompleted: (data) => {
      if (data.getOrders.status) {
        setOrders(data.getOrders.orders);
        console.log(data);
      }
    },
  });
  if (!isNaN(userId)) {
    useQuery(GET_USER, {
      variables: {
        id: userId,
      },
      onCompleted: (data) => {
        setUser(data.getUser.user);
      },
    });
  }

  return (
    <Box sx={BoxStyle}>
      <Box sx={{ flexBasis: "20%" }}>{user && <UserElement user={user} />}</Box>
      <Container maxWidth={"md"} sx={ContainerStyle}>
        <Stack spacing={6}>
          {orders.map((order) => (
            <Card key={order.id} sx={CardStyle}>
              <Box sx={{ margin: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <Typography variant={"h6"} gutterBottom>
                    ЗАКАЗ #{order.id}
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                    {!user && (
                      <Chip
                        label={order.status}
                        sx={{
                          height: "25px",
                          minWidth: "50px",
                          marginLeft: "25px",
                        }}
                      />
                    )}
                    {user && (
                      <OrderStatusSelector
                        id={order.id}
                        status={order.status}
                        refetchOrders={refetch}
                      />
                    )}
                  </Box>
                </Box>
                <Typography>Дата создания: {order.creationDate}</Typography>
                <Typography>Дата выполнения{order.completionDate}</Typography>
              </Box>
              <TableContainer component={Paper} sx={TableContainerStyle}>
                <Table stickyHeader aria-label="Заказ: ">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Название</StyledTableCell>
                      <StyledTableCell>Цена</StyledTableCell>
                      <StyledTableCell>Количество</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {order.orderLines.map(({ product, amount }) => (
                      <StyledTableRow key={product.id}>
                        <StyledTableCell>{product.name}</StyledTableCell>
                        <StyledTableCell>{product.price}</StyledTableCell>
                        <StyledTableCell>{amount}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
