import { HashRouter, Route, Routes } from "react-router";
import NotImplemented from "./components/NotImplemented";
import MainLayout from "./layouts/MainLayout";
import CustomerDetailsPage from "./pages/customerDetails";
import CustomerDetailsTrainingsPage from "./pages/customerDetails/trainings";
import CustomersPage from "./pages/customers";
import HomePage from "./pages/home";
import NewCustomerDetailsPage from "./pages/newCustomerDetails";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route Component={MainLayout}>
          <Route index Component={HomePage} />
          <Route path="customers" Component={CustomersPage} />
          <Route path="customers/new" Component={NewCustomerDetailsPage} />
          <Route path="customers/:id">
            <Route index Component={CustomerDetailsPage} />
            <Route path="trainings" Component={CustomerDetailsTrainingsPage} />
          </Route>
          <Route path="trainings" Component={NotImplemented} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
