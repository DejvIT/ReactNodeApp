import {Calendar} from "@fullcalendar/core";
import csLocale from "@fullcalendar/core/locales/cs"
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import React, {useCallback, useEffect, useRef} from "react";
import ReservationModal from "./ReservationModal";

import ReservationService from '../../services/reservation.service';
import MachineService from '../../services/machine.service';
import {toast} from "react-toastify";

let calendar;

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

function ReservationCalendar({currentUser, machineName}) {
  const calendarRef = React.useRef(null);
  const [events, setEvents] = React.useState([]);
  const [machine, setMachine] = React.useState(null);
  const [modalAdd, setModalAdd] = React.useState(false);
  const [modalUpdate, setModalUpdate] = React.useState(false);
  const [currentDateTitle, setCurrentDateTitle] = React.useState(null);
  const [currentDateRange, setCurrentDateRange] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState(null);
  const [description, setDescription] = React.useState("");

  const isMounted = useMountedState()

  // React.useEffect(() => {
  //   // console.log(events);
  //   setEvents([]);
  //   if (currentUser) {
  //     // todo zmenit podle routy nejlepe jako props z parent komponenty
  //     createCalendar();
  //   }
  // }, []);

  // React.useEffect(() => {
  //   getData().then(data => {
  //     console.log(data);
  //     if (isMounted()) {
  //       setEvents(data);
  //     }
  //   });
  // }, [isMounted])

  React.useEffect(() => {
    if (machineName) {
      getMachine().then(response => {
        if (response) {
          setMachine(response);
        }
      })
    }
  }, [machineName])

  React.useEffect(() => {
    if (machine) {
      getData(machine.id).then(data => {
        setEvents(data);
      })
    }
  }, [machine])

  React.useEffect(() => {
    if (events) {
      console.log('nacetli se eventy', events);
      createCalendar();
    }
  }, [events])

  const getMachine = async () => {
    return await MachineService.findMachineByUrl(machineName).then(response => {
      if (response.data && response.data.length > 0) {
        return response.data[0];
      }
      return null;
    }).catch(() => {
      return null;
    })
  }

  const getData = async (id) => {
    return await ReservationService.findReservationByMachineId(id).then(response => {
      return response.data.map(event => {
        const endDate = new Date(event.end);
        return {
          id: event.id,
          propertyOfCurrentUser: currentUser.id === event.user_id,
          title: currentUser.id === event.user_id ? event.invoice_id ? machine.name + " - vaše rezervace (ZAPLACENO)" : machine.name + " - vaše rezervace (REZERVOVÁNO)" : machine.name + " - rezervováno",
          start: new Date(event.start),
          paid: !!event.invoice_id,
          end: new Date(endDate.setDate(endDate.getDate() + 1)),
          allDay: event.all_day,
          className: currentUser.id === event.user_id ? event.invoice_id ? "bg-success" : "bg-warning" : "bg-danger",
          description: event.note,
        }
      })
    }).catch(() => {
      return [];
    });
  }

  const createCalendar = () => {
    console.log(currentDateRange)
    calendar = new Calendar(calendarRef.current, {
      locale: csLocale,
      plugins: [interaction, dayGridPlugin],
      initialView: "dayGridMonth",
      selectable: true,
      editable: true,
      events: events,
      eventLimit: true,
      headerToolbar: "",
      // validRange: {
      //   start: new Date(),
      // },
      // Add new event
      select: (info) => {
        openReservationModal(info.startStr, info.endStr);
      },
      // Edit calendar event action
      eventClick: ({ event }) => {
        openReservationUpdateModal(event);
      },
    });
    calendar.render();
    if (currentDateRange) {
      calendar.gotoDate(currentDateRange)
    }
    setCurrentDateTitle(calendar.view.title);
  }

  const openReservationModal = (start, end) => {
    let isFree = true;
    let isBeforeToday = false;
    const endDateSubDay = new Date(new Date(end).setDate(new Date(end).getDate() - 1));
    events.map(event => {
      const isBefore = new Date(start) >= new Date() && endDateSubDay < event.start && new Date(start) < event.start;
      const isAfter = new Date(start) >= new Date() && new Date(start) >= event.start && new Date(end) >= event.end;
      isBeforeToday = new Date(start) < new Date();
      console.log(isBefore, isAfter);
      if (!isBefore && !isAfter) {
        isFree = false;
      }
    })
    console.log('ulozit rezervaci?', isFree)
    if (isFree) {
      setModalAdd(true);
      setStartDate(new Date(start));
      setEndDate(endDateSubDay);
    } else {
      if (!isBeforeToday) {
        toast.error("Ve vybraném termínu už existují rezervace");
      }
    }
  }

  const openReservationUpdateModal = (event) => {
    console.log(event);
    if (event._def.extendedProps.propertyOfCurrentUser) {
      setSelectedId(parseInt(event._def.publicId))
      setStartDate(event._instance.range.start)
      setDescription(event._def.extendedProps.description)
      const endDateSubDay = new Date(new Date(event._instance.range.end).setDate(new Date(event._instance.range.end).getDate() - 1));
      setEndDate(endDateSubDay);
      setModalUpdate(true);
    } else {
      toast.error("Rezervace která byla zvolena k úpravě není vaše.");
    }
  }

  const closeAddModal = (status) => {
    setModalAdd(status);
  }

  const closeUpdateModal = (status) => {
    setModalUpdate(status);
  }

  const refreshEvents = () => {
    if (machine) {
      getData(machine.id).then(data => {
        if (calendar.currentData.dateSelection) {
          setCurrentDateRange(calendar.currentData.dateSelection.range.start);
        }
        setEvents(data);
      });
    }
  }

  return (
    <div className="card mb-3 reservation-calendar">
      <div className="card-body pt-0">
        <div className="row">
          <div className="col-6">
            <h5 className="card-title p-3 mb-0"><strong>Zvolte datum:</strong> {currentDateTitle}</h5>
          </div>
          <div className="col-6 pt-1 text-right">
            <button
              type="button"
              className="btn btn-rounded btn-sm btn-icon fullcalendar-btn-prev microbagr-green-color"
              data-mdb-ripple-color="dark"
              onClick={() => {
                calendar.prev();
                setCurrentDateTitle(calendar.view.title);
              }}
            >
              <i className="fas fa-chevron-left"/>
            </button>
            <button
              type="button"
              className="btn btn-rounded btn-sm btn-icon fullcalendar-btn-next microbagr-green-color"
              data-mdb-ripple-color="dark"
              onClick={() => {
                calendar.next();
                setCurrentDateTitle(calendar.view.title);
              }}
            >
              <i className="fas fa-chevron-right"/>
            </button>
          </div>
        </div>
        <div
          className="calendar"
          data-toggle="calendar"
          id="calendar"
          ref={calendarRef}
        />
      </div>
      <ReservationModal
        createMode={true}
        open={modalAdd}
        startDate={startDate}
        endDate={endDate}
        machine={machine}
        description={description}
        currentUser={currentUser}
        onModalClose={closeAddModal}
        onModalChange={refreshEvents}
      />
      <ReservationModal
        createMode={false}
        reservations={events}
        open={modalUpdate}
        startDate={startDate}
        endDate={endDate}
        selectedId={selectedId}
        machine={machine}
        description={description}
        currentUser={currentUser}
        onModalClose={closeUpdateModal}
        onModalChange={refreshEvents}
      />
    </div>
  )
}

export default ReservationCalendar;
