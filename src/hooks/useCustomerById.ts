import { useCallback, useEffect, useState, useTransition } from "react";
import { loadCustomerById, saveOrCreateCustomer } from "../services";

function useCustomerById(id: number | null): [CustomerEntity | null, (value: Partial<Customer>) => void, boolean] {
  const [data, setData] = useState<CustomerEntity | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (id === null) return;

    startTransition(async () => {
      const data = await loadCustomerById(id);
      setData(data);
    });
  }, [id]);

  const save = useCallback((value: Partial<Customer>) => {
    startTransition(async () => {
      const data = await saveOrCreateCustomer(id, value);
      setData(data);
    });
  }, [id]);

  return [data, save, isPending];
}

export default useCustomerById;
