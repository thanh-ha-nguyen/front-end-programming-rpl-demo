import { HashRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import CustomersPage from "./pages/customers";
import HomePage from "./pages/home";
import TrainingsPage from "./pages/trainings";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route Component={MainLayout}>
          <Route index Component={HomePage} />
          <Route path="customers" Component={CustomersPage} />
          <Route path="trainings" Component={TrainingsPage} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
