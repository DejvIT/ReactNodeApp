import latinize from "latinize";
import { Link } from "react-router-dom";
import { useState } from "react";

type Props = {
  name: string;
};
const ReservationButton = ({ name }: Props) => {
  /**
   * changes text to lowercase
   * 
   */
  const [url] = useState(
    latinize(
      name.toLowerCase()
    )
  );
  return (
    <div className="d-flex justify-content-center py-1">
      <Link to={`/reservation/${url}`}>
        <button type="button" className="btn  btn-lg cta-green text-white">
          Rezervovat
        </button>
      </Link>
    </div>
  );
};

export default ReservationButton;
