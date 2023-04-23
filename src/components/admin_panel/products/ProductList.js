import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_PRODUCTS} from "../../../operations/queries/getProducts";
import {
    Button,
    ButtonBase,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import ErrorsHandler from "../../ErrorsHandler";

export default function ProductList(props) {
    const {setSelectedProduct, setSelectedAction} = props;
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState([]);

    const {error} = useQuery(GET_PRODUCTS, {
        onCompleted: (data) => {
            setErrors(data.getProducts.errors)
            setProducts(data.getProducts.products)
        }
    })

    const handleClick = (newProduct) => {
        console.log("Нажата кнопка редактировать")
        setSelectedProduct(newProduct);
        setSelectedAction("update");
    }

    return (<Container spacing={2} maxWidth="md" sx={{mb: 2}}>
        <h3>Список товаров сайта</h3>
        <ErrorsHandler errors={errors} apolloError={error}/>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={product.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>
                                <Button onClick={(event) => handleClick(product)}>Редактировать</Button>
                            </TableCell>
                        </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>)

}

