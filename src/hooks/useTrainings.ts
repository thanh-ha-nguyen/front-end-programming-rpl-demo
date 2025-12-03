import { useCallback, useEffect, useState, useTransition } from "react";
import { loadTrainings } from "../services";

function useTrainings(
  search: string = "",
  initialData: Array<TrainingEntity> = [], 
): [
  Array<TrainingEntity>, 
  () => void, 
  boolean
] {
  const [data, setData] = useState<Array<TrainingEntity>>(initialData);
  const [filteredData, setFilteredData] = useState<Array<TrainingEntity>>(initialData);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      setData(await loadTrainings());
    });
  }, []);

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
                  row.customer?.firstname?.toLowerCase().startsWith(searchTerm) ||
                  row.customer?.lastname?.toLowerCase().startsWith(searchTerm) ||
                  row.customer?.email?.toLowerCase().includes(searchTerm) ||
                  row.customer?.phone?.toLowerCase().includes(searchTerm)
              )
          )
    );
  }, [search, data]);

  return [filteredData, sort, isPending];
}

export default useTrainings;
