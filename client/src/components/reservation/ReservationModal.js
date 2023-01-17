import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import ReservationService from '../../services/reservation.service';
import {toast} from "react-toastify";

export default function FormDialog({ createMode,
                                     open,
                                     selectedId,
                                     description,
                                     startDate,
                                     endDate,
                                     currentUser,
                                     onModalClose,
                                     onModalChange,
                                     reservations,
                                     machine,
}) {
  const [note, setNote] = React.useState("");
  const [storing, setStoring] = React.useState(false);
  const [paymentPage, setPaymentPage] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setNote(createMode ? "" : description);
      console.log('reservations', reservations)
    }
  }, [open])

  const handleClose = () => {
    onModalClose(false);
    setPaymentPage(false);
  };

  const handlePayment = () => {
    setPaymentPage(true);
  }

  const handleReservation = () => {
    setStoring(true)
    const data = {
      user_id: currentUser.id,
      machine_id: machine.id,
      note: note,
      start: startDate,
      end: endDate,
    }
    if (createMode) {
      ReservationService.createReservation(data).then(() => {
        onModalChange();
        handleClose();
        setStoring(false);
        toast.success("Rezervace úspěšně vytvořena");
      }).catch(() => {
        setStoring(false);
      })
    } else {
      ReservationService.updateReservation(data, selectedId).then(() => {
        onModalChange();
        handleClose();
        setStoring(false);
        toast.success("Rezervace úspěšně upravena");
      }).catch(() => {
        setStoring(false);
      })
    }
  };

  const handleDeleteReservation = () => {
    setStoring(true)
    ReservationService.deleteReservation(selectedId).then(() => {
      onModalChange();
      handleClose();
      setStoring(false);
      toast.success("Rezervace úspěšně smazána");
    }).catch(() => {
      setStoring(false);
    })
  }

  const onChangeNote = (e) => {
    setNote(e.target.value);
  }

  return (
    <div>
      {!createMode && (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Rezervační formulář
            <IconButton aria-label="delete" onClick={handleClose} color="primary" className="p-0 mt-1 float-end">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vybrané datum rezervace je {startDate && (
              <span>{startDate.getDate() + '.' + startDate.getMonth() + '.' + startDate.getUTCFullYear()}</span>
            )}
              {startDate &&
              endDate &&
              (endDate.getDate() !== startDate.getDate() ||
                endDate.getMonth() !== startDate.getMonth() ||
                endDate.getUTCFullYear() !== startDate.getUTCFullYear()) && (
                <span className="mx-1">až</span>
              )}
              {endDate &&
              (endDate.getDate() !== startDate.getDate() ||
                endDate.getMonth() !== startDate.getMonth() ||
                endDate.getUTCFullYear() !== startDate.getUTCFullYear()) && (
                <span>{endDate.getDate() + '.' + endDate.getMonth() + '.' + endDate.getUTCFullYear()}</span>
              )}.
            </DialogContentText>
            <DialogContentText>
                <textarea
                  id="textarea-char-counter"
                  length="120"
                  rows="7"
                  name="content"
                  className="form-control md-textarea"
                  value={note}
                  onChange={onChangeNote}
                />
            </DialogContentText>
          </DialogContent>
          {storing ? (
            <span>
            <i className="fas fa-spinner fa-spin"/>
          </span>
          ) : (
            <DialogActions>
              <DialogActions>
                <Button onClick={handleDeleteReservation} color="secondary">
                  Zrušit
                </Button>
              </DialogActions>
              <DialogActions>
                <Button onClick={handleReservation} color="primary" variant="contained">
                  Upravit rezervaci
                </Button>
              </DialogActions>
            </DialogActions>
          )}
        </Dialog>
      )}

      {createMode && paymentPage && (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Platba
            <IconButton aria-label="delete" onClick={handleClose} color="primary" className="p-0 mt-1 float-end">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vybrané datum rezervace je {startDate && (
              <span>{startDate.getDate() + '.' + startDate.getMonth() + '.' + startDate.getUTCFullYear()}</span>
            )}
              {startDate &&
              endDate &&
              (endDate.getDate() !== startDate.getDate() ||
                endDate.getMonth() !== startDate.getMonth() ||
                endDate.getUTCFullYear() !== startDate.getUTCFullYear()) && (
                <span className="mx-1">až</span>
              )}
              {endDate &&
              (endDate.getDate() !== startDate.getDate() ||
                endDate.getMonth() !== startDate.getMonth() ||
                endDate.getUTCFullYear() !== startDate.getUTCFullYear()) && (
                <span>{endDate.getDate() + '.' + endDate.getMonth() + '.' + endDate.getUTCFullYear()}</span>
              )}.
            </DialogContentText>
            <DialogContentText>
                <textarea
                  id="textarea-char-counter"
                  length="120"
                  rows="7"
                  name="content"
                  className="form-control md-textarea"
                  value={note}
                  onChange={onChangeNote}
                />
            </DialogContentText>
          </DialogContent>
          <DialogContent>
           {/*  // TODO platebni formular */}
          </DialogContent>
        </Dialog>
      )}

      {createMode && !paymentPage && (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Rezervační formulář
            <IconButton aria-label="delete" onClick={handleClose} color="primary" className="p-0 mt-1 float-end">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vybrané datum rezervace je {startDate && (
              <span>{startDate.getDate() + '.' + startDate.getMonth() + '.' + startDate.getUTCFullYear()}</span>
            )}
              {startDate &&
              endDate &&
              (endDate.getDate() !== startDate.getDate() ||
                endDate.getMonth() !== startDate.getMonth() ||
                endDate.getUTCFullYear() !== startDate.getUTCFullYear()) && (
                <span className="mx-1">až</span>
              )}
              {endDate &&
              (endDate.getDate() !== startDate.getDate() ||
                endDate.getMonth() !== startDate.getMonth() ||
                endDate.getUTCFullYear() !== startDate.getUTCFullYear()) && (
                <span>{endDate.getDate() + '.' + endDate.getMonth() + '.' + endDate.getUTCFullYear()}</span>
              )}.
            </DialogContentText>
            <DialogContentText>
                <textarea
                  id="textarea-char-counter"
                  length="120"
                  rows="7"
                  name="content"
                  className="form-control md-textarea"
                  value={note}
                  onChange={onChangeNote}
                />
            </DialogContentText>
          </DialogContent>
          {storing ? (
            <DialogActions>
              <i className="fas fa-spinner fa-spin m-auto" style={{ fontSize: 22 + 'px', color: '#3f51b5' }}/>
            </DialogActions>
          ) : (
            <DialogActions>
              <DialogActions>
                <Button onClick={handleReservation} color="primary">
                  Rezervovat
                </Button>
              </DialogActions>
              <DialogActions>
                <Button onClick={handlePayment} color="primary" variant="contained">
                  Rezervovat a zaplatit
                </Button>
              </DialogActions>
            </DialogActions>
          )}
        </Dialog>
      )}
    </div>
  );
}
