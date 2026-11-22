import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { statusLabel } from "../../labels";


const MyTable = ({orders}) => {

  return (
    
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Bestellung ID</TableCell>
            <TableCell className="tableCell">Benutzername</TableCell>
            <TableCell className="tableCell">Zahlungsart</TableCell>
            <TableCell className="tableCell">Datum</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {orders.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.orderId}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {row.name} {row.surname}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.paymentName}</TableCell>
              <TableCell className="tableCell">{row.orderDate}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{statusLabel(row.status)}</span>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
