import { useCallback, useEffect, useState, useTransition } from "react";
import { loadCustomers } from "../services";

function useCustomers(
  search: string = "",
  initialData: Array<CustomerEntity> = [], 
): [
  Array<CustomerEntity>, 
  () => void, 
  boolean
] {
  const [data, setData] = useState<Array<CustomerEntity>>(initialData);
  const [filteredData, setFilteredData] = useState<Array<CustomerEntity>>(initialData);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      setData(await loadCustomers());
    });
  }, []);

  const sort = useCallback(() => {
    setData((data) =>
      data.slice(0).sort((first, second) => {
        const firstFullName = `${first.firstname} ${first.lastname}`;
        const secondFullName = `${second.firstname} ${second.lastname}`;
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
                  row.firstname?.toLowerCase().startsWith(searchTerm) ||
                  row.lastname?.toLowerCase().startsWith(searchTerm) ||
                  row.email?.toLowerCase().includes(searchTerm) ||
                  row.phone?.toLowerCase().includes(searchTerm)
              )
          )
    );
  }, [search, data]);

  return [filteredData, sort, isPending];
}

export default useCustomers;
