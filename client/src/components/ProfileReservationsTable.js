import React, {useCallback, useEffect, useRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

import ReservationService from '../services/reservation.service';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const useMountedState = () => {
  const mountedRef = useRef(false)
  const isMounted = useCallback(() => mountedRef.current, [])

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  return isMounted
}

export default function ProfileReservationsTable({currentUser, admin, filter}) {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);

  const isMounted = useMountedState()

  React.useEffect(() => {
    // mounted
  },[isMounted]);

  React.useEffect(() => {
    if (currentUser)
      getData().then(data => {
        setRows(data);
      });
  }, [filter])

  const getData = async () => {
    const params = {
      deleted: admin ? filter.deleted : false,
      users: admin ? filter.users : "me",
      time: filter.time,
    }
    return await ReservationService.findReservationByUserId(currentUser.id, params).then(response => {
      return response.data.map(reservation => {
        return {
          id: reservation.id,
          start: new Date(reservation.start),
          end: new Date(reservation.end),
          status: reservation.invoice_id ? 2 : 1,
          created: new Date(reservation.createdAt),
          deleted: !!reservation.deletedAt,
          machine: reservation.machine,
        }
      })
    }).catch(err => {
      console.log(err);
      return [];
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Číslo rezervace</TableCell>
            <TableCell align="center">Vytvořeno</TableCell>
            <TableCell align="left">Stroj</TableCell>
            <TableCell align="center">Od</TableCell>
            <TableCell align="center">Do</TableCell>
            <TableCell align="center">Stav</TableCell>
            <TableCell align="right"/>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                #{row.id + 550}
              </TableCell>
              <TableCell align="center">
                {row.created.getDate() + '.' + row.created.getMonth() + '.' + row.created.getUTCFullYear() + ' ' + row.created.getHours() + ':' + row.created.getMinutes()}
              </TableCell>
              <TableCell align="left">
                {row.machine.name}
              </TableCell>
              <TableCell align="center">
                <span className="badge bg-info">
                  {row.start.getDate() + '.' + row.start.getMonth() + '.' + row.start.getUTCFullYear()}
                </span>
              </TableCell>
              <TableCell align="center">
                <span className="badge bg-info">
                  {row.end.getDate() + '.' + row.end.getMonth() + '.' + row.end.getUTCFullYear()}
                </span>
              </TableCell>
              <TableCell align="center">
                <span className={row.status === 1 ? "badge bg-warning" : "badge bg-success"}>
                  {row.status === 1 ? "Rezervováno" : "Zaplaceno"}
                </span>
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" color={row.deleted ? "inherit" : "secondary"}>
                  {row.deleted ? (
                    <SettingsBackupRestoreIcon />
                  ) : (
                    <ClearIcon />
                  )}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}