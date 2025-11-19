import NotImplemented from "../components/NotImplemented";
import { useAppPageContextValue } from "../contexts/AppPageContext";

function TrainingsPage() {
  useAppPageContextValue({ title: 'TRAININGS' });

  return (
    <NotImplemented />
  );
}

export default TrainingsPage;
