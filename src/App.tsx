import { useEffect, useState } from "react";
import WeekView from "./components/WeekView";
import { populateIndexedDBWithEvents } from "./services/IndexedDBService";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

const calendar_events = [
  {
    id: 1,
    title: "History Study Session",
    date: "2025-03-16",
    start_time: "01:00 AM",
    end_time: "01:50 AM",
    user: {
      name: "Mack",
    },
  },
  {
    id: 2,
    title: "Study Session",
    date: "2025-03-16",
    start_time: "03:00 AM",
    end_time: "03:50 AM",
    user: {
      name: "Mohit",
    },
  },
  {
    id: 3,
    title: "Study Session",
    date: "2025-03-16",
    start_time: "07:00 AM",
    end_time: "07:50 AM",
    user: {
      name: "Kate",
    },
  },
  {
    id: 4,
    title: "Study Session",
    date: "2025-03-16",
    start_time: "05:00 AM",
    end_time: "05:25 AM",
    user: {
      name: "Mack",
    },
  },
];

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    populateIndexedDBWithEvents(calendar_events)
      .then(() => {
        console.log("IndexedDB populated with events data.");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error populating IndexedDB:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<WeekView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
