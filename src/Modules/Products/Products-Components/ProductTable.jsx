import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
  } from "@mui/material";
  import { styled } from "@mui/material/styles";
  import { tableCellClasses } from "@mui/material/TableCell";
  import { MdDelete } from "react-icons/md";
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  
  export default function ProductTable({ products, onEdit, onDelete }) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Price ($)</StyledTableCell>
              <StyledTableCell>Model</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product._id}>
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell>{product.description || "N/A"}</StyledTableCell>
                <StyledTableCell align="right">${product.price.toFixed(2)}</StyledTableCell>
                <StyledTableCell>{product.model || "N/A"}</StyledTableCell>
                <StyledTableCell>
                  {product.imageCover ? (
                    <img
                      src={`${import.meta.env.VITE_IMAGEURL}/${product.imageCover}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "N/A"
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">{product.stock}</StyledTableCell>
                <StyledTableCell>
                  <Button variant="outlined" onClick={() => onEdit(product)}>Edit</Button>
                  <Button color="error" onClick={() => onDelete(product._id)}>
                    <MdDelete size={20} />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  