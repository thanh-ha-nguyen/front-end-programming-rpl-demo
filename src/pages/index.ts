import type React from "react";
import CustomersPage from "./customers";
import TrainingsPage from "./trainings";

interface AppPage {
  title?: string;
  component: React.ComponentType;
}

const pages: AppPage[] = [
  { title: "Customers", component: CustomersPage },
  { title: "Trainings", component: TrainingsPage },
];

export default pages;
