import { useCallback, useEffect, useState, useTransition } from "react";
import {
  addTraining,
  loadTrainingsByCustomerId,
  removeTraining,
} from "../services";

function useTrainingsByCustomerId(
  customerId: number | null
): [
  Array<TrainingEntity>,
  (value: Partial<Training>) => void,
  (trainingId: number) => void,
  () => void,
  boolean
] {
  const [data, setData] = useState<Array<TrainingEntity>>([]);
  const [isPending, startTransition] = useTransition();

  const reload = useCallback(() => {
    if (customerId === null) return;

    startTransition(async () => {
      setData(await loadTrainingsByCustomerId(customerId));
    });
  }, [customerId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const add = useCallback(
    async (value: Partial<Training>) => {
      if (customerId === null) return;

      startTransition(async () => {
        await addTraining(customerId, value);
        reload();
      });
    },
    [customerId, reload]
  );

  const remove = useCallback(
    async (trainingId: number) => {
      startTransition(async () => {
        await removeTraining(trainingId);
        reload();
      });
    },
    [reload]
  );

  return [data, add, remove, reload, isPending];
}

export default useTrainingsByCustomerId;
