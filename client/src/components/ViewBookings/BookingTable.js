import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Avatar, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function BookingTable(bookings) {
    console.log("bookings in table", bookings.children[1])
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>Studysession</TableCell>
                <TableCell>Student</TableCell>
                <TableCell>Booking date</TableCell>
                <TableCell>Is confirmed by student</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Need help?</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {bookings.children[1].map((booking) => (
                <Row key={booking._id} row={booking} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-GB');
  return formattedDate;
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.studysession.course.name}
        </TableCell>
        <TableCell>
            <Grid container alignItems='center' spacing={2}>
                <Grid item>
                <Avatar src={row.createdBy.picture} />
                </Grid>
                <Grid item>
            <span>{row.createdBy.firstname} {row.createdBy.lastname}</span>
                </Grid>
            </Grid>
            </TableCell>
        <TableCell>{formatDate(row.createdAt)}</TableCell>
        <TableCell>
            {row.isConfirmed && (
            <CheckCircleIcon style={{ color: 'green' }}/>
        )}
        {!row.isConfirmed && (
            <CancelIcon style={{ color: 'red' }}/>
        )}
        </TableCell>
        <TableCell>{row.reviewGiven}</TableCell>
        <TableCell><Button>Contact customer support</Button></TableCell>
      </TableRow>
    </React.Fragment>
  );
}

/**Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};**/

function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Student</TableCell>
            <TableCell align="right">Booking date</TableCell>
            <TableCell align="right">Is confirmed by student</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Need help?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}