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
import ErrorsHandler from "../components/ErrorsHandler";

const ContainerStyle = {
  marginTop: "20px",
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
  const { error } = useQuery(GET_ORDERS, {
    onCompleted: (data) => {
      if (data.getOrders.status) {
        setOrders(data.getOrders.orders);
      }
    },
  });

  if (error) {
    return <ErrorsHandler apolloError={error} errors={[]} />;
  }

  return (
    <Container maxWidth={"md"} sx={ContainerStyle}>
      <Stack spacing={6}>
        {orders.map((order) => (
          <Card key={order.id} sx={CardStyle}>
            <Box sx={{ margin: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Typography variant={"h6"} gutterBottom>
                  ЗАКАЗ #{order.id}
                </Typography>
                <Chip
                  label={order.status}
                  sx={{ height: "25px", minWidth: "50px", marginLeft: "25px" }}
                />
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
  );
}
