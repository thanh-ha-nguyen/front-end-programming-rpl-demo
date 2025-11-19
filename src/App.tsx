import { HashRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import CustomerDetailsView from "./components/CustomerDetailsView";
import CustomersPage from "./pages/customers";
import HomePage from "./pages/home";
import TrainingsPage from "./pages/trainings";
import CustomerDetailsLayout from "./layouts/CustomerDetailsLayout";
import NotImplemented from "./components/NotImplemented";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route Component={MainLayout}>
          <Route index Component={HomePage} />
          <Route path="customers" Component={CustomersPage} />
          <Route path="customers/:id" Component={CustomerDetailsLayout}>
            <Route index Component={CustomerDetailsView} />
            <Route path="trainings" Component={NotImplemented} />
          </Route>
          <Route path="trainings" Component={TrainingsPage} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
