import { useEffect, useState, useTransition } from "react";
import { loadCustomerById } from "../services";

function useCustomerById(id: number): [CustomerEntity | null, boolean] {
  const [data, setData] = useState<CustomerEntity | null>(null);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(async () => {
      setData(await loadCustomerById(id));
    });
  }, [id]);
  return [data, isPending];
}

export default useCustomerById;
