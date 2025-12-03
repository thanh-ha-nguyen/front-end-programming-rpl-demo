import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useParams } from "react-router";
import "./trainings.css";

function CustomerDetailsTrainingsPage() {
  const { id } = useParams();

  return (
    <FullCalendar
      plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: "prev,next,today",
        center: "title",
        right: "dayGridYear,timeGridWeek,timeGridDay",
      }}
      selectable
    />
  );
}

export default CustomerDetailsTrainingsPage;
