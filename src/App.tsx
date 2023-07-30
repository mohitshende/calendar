import { useEffect } from "react";
import WeekView from "./components/WeekView";
import { populateIndexedDBWithEvents } from "./services/IndexedDBService";

const calendar_events = [
  {
    id: 1,
    title: "Meeting with Marketing Team",
    date: "2023-07-30",
    start_time: "12:00 AM",
    end_time: "1:30 AM",
  },
  {
    id: 2,
    title: "Discussion",
    date: "2023-08-01",
    start_time: "5:00 AM",
    end_time: "6:30 AM",
  },
  {
    id: 3,
    title: "Lunch with Colleagues",
    date: "2023-08-05",
    start_time: "12:00 PM",
    end_time: "3:30 PM",
  },
  {
    id: 4,
    title: "Project Presentation",
    date: "2023-08-12",
    start_time: "2:00 PM",
    end_time: "4:00 PM",
  },
  {
    id: 5,
    title: "Client Conference Call",
    date: "2023-08-18",
    start_time: "3:30 PM",
    end_time: "4:30 PM",
  },
  {
    id: 6,
    title: "Team Building Event",
    date: "2023-08-25",
    start_time: "9:00 AM",
    end_time: "5:00 PM",
  },
];

function App() {
  useEffect(() => {
    populateIndexedDBWithEvents(calendar_events)
      .then(() => {
        console.log("IndexedDB populated with events data.");
      })
      .catch((error) => {
        console.error("Error populating IndexedDB:", error);
      });
  }, []);

  return <WeekView />;
}

export default App;
