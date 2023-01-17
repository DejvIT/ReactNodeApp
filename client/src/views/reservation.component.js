import React from "react";
import { useLocation } from "react-router-dom";
import ReservationCalendar from '../components/reservation/ReservationCalendar';

function Reservation({ currentUser }) {
  const [machineName, setMachineName] = React.useState(null);
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname.split('/')[2]) {
      setMachineName(location.pathname.split('/')[2]);
    }
  }, [])

  return (
    <div className="row">
      <div className="col-12 text-center">
        <h1 className="microbagr-green-color">Vaše rezervace</h1>
      </div>
      <div className="col-12">
        <ReservationCalendar currentUser={currentUser} machineName={machineName}/>
      </div>
    </div>
  )
}

export default Reservation;