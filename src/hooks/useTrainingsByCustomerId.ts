import { useCallback, useEffect, useState, useTransition } from "react";
import { loadTrainingsByCustomerId } from "../services";

function useTrainingsByCustomerId(
  customerId: number | null,
  search: string = ""
): [Array<TrainingEntity>, () => void, boolean] {
  const [data, setData] = useState<Array<TrainingEntity>>([]);
  const [filteredData, setFilteredData] = useState<Array<TrainingEntity>>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (customerId === null) return;

    startTransition(async () => {
      setData(await loadTrainingsByCustomerId(customerId));
    });
  }, [customerId]);

  const sort = useCallback(() => {
    setData((data) =>
      data.slice(0).sort((first, second) => {
        const firstFullName = `${first.customer?.firstname} ${first.customer?.lastname}`;
        const secondFullName = `${second.customer?.firstname} ${second.customer?.lastname}`;
        return firstFullName.localeCompare(secondFullName);
      })
    );
  }, []);

  useEffect(() => {
    setFilteredData(
      search.trim().length === 0
        ? data
        : data.filter((row) =>
            search
              .split(/\s+/)
              .filter((searchTerm) => searchTerm.length > 0)
              .some(
                (searchTerm) =>
                  row.activity?.toLowerCase().includes(searchTerm) ||
                  row.customer?.firstname
                    ?.toLowerCase()
                    .startsWith(searchTerm) ||
                  row.customer?.lastname
                    ?.toLowerCase()
                    .startsWith(searchTerm) ||
                  row.customer?.email?.toLowerCase().includes(searchTerm) ||
                  row.customer?.phone?.toLowerCase().includes(searchTerm)
              )
          )
    );
  }, [search, data]);

  return [filteredData, sort, isPending];
}

export default useTrainingsByCustomerId;
