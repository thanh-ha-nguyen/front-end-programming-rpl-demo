import { useCallback, useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { createOrSaveCustomer, loadCustomerById } from "../services";

function useCustomerById(
  id: number | null
): [
  (value: Partial<Customer>) => void,
  boolean,
  CustomerEntity | null,
  () => void
] {
  const navigate = useNavigate();
  const [data, setData] = useState<CustomerEntity | null>(null);
  const [isPending, startTransition] = useTransition();

  const reload = useCallback(() => {
    if (id === null) return;

    startTransition(async () => {
      const data = await loadCustomerById(id);
      setData(data);
    });
  }, [id]);

  useEffect(() => {
    reload();
  }, [reload]);

  const save = useCallback(
    (value: Partial<Customer>) => {
      startTransition(async () => {
        const data = await createOrSaveCustomer(id, value);
        if (id === null) navigate(`/customers/${data.id}`);
        setData(data);
      });
    },
    [id, navigate]
  );

  return [save, isPending, data, reload];
}

export default useCustomerById;
