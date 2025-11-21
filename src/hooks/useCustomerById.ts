import { useEffect, useState, useTransition } from "react";
import { loadCustomerById } from "../services";

function useCustomerById(
  id: number,
  onLoaded: (data: CustomerEntity) => unknown = () => void 0
): [CustomerEntity | null, boolean] {
  const [data, setData] = useState<CustomerEntity | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await loadCustomerById(id);
      setData(data);
      onLoaded(data);
    });
  }, [id, onLoaded]);
  return [data, isPending];
}

export default useCustomerById;
