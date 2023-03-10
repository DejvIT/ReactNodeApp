import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';


const columns = [
  {
    id: 'id',
    label: 'ID',
    minWidth: 170,
    align: 'left',
    /* format: (value) => value.toLocaleString('en-US'), */
  },
  {
    id: 'name',
    label: 'Název',
    minWidth: 170,
    align: 'left',
    /* format: (value) => value.toLocaleString('en-US'), */
  },
  {
    id: 'price',
    label: 'Cena',
    minWidth: 170,
    align: 'left',
    /* format: (value) => value.toFixed(2), */
    },
    {
        id: 'edit',
        label: '',
        minWidth: 80,
        align: 'right',
        /* format: (value) => value.toFixed(2), */
      },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

/* const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
]; */

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


const AdminTable = ({items}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows] = useState(items);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell align={"left"}>
                       {row.id}
                      </TableCell>
                      <TableCell align={"left"}>
                      {row.name}
                      </TableCell>
                      <TableCell align={"left"}>
                      {row.price}
                      </TableCell>
                      <TableCell align={"right"}>
                      <IconButton aria-label="delete">
                      <EditOutlinedIcon></EditOutlinedIcon>
                        </IconButton>
                     
                        
                    </TableCell>

{/*                       
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })} */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default AdminTable