interface CustomerJson extends Customer {
  _links: {
    self: { href: string };
    customer: { href: string };
    trainings: { href: string };
  };
}

interface LoadCustomersResponseJson {
  _embedded: {
    customers: Array<CustomerJson>;
  };
}

export async function loadCustomers(): Promise<Array<CustomerEntity>> {
  const response = await fetch(
    `${import.meta.env.VITE_CUSTOMERS_API_BASE_URL}/customers`
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const json: LoadCustomersResponseJson = await response.json();
  return json._embedded.customers.map((customer) => {
    const id = Number(/\/(\d+)$/.exec(customer._links.self.href)![1]);
    return {
      ...customer,
      id,
    };
  });
}

export async function loadCustomerById(id: number): Promise<CustomerEntity> {
  const response = await fetch(
    `${import.meta.env.VITE_CUSTOMERS_API_BASE_URL}/customers/${id}`
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.json();
}

export async function createOrSaveCustomer(
  customerId: number | null,
  data: Partial<Customer>
): Promise<CustomerEntity> {
  const response =
    customerId !== null
      ? await fetch(
          `${
            import.meta.env.VITE_CUSTOMERS_API_BASE_URL
          }/customers/${customerId}`,
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      : await fetch(
          `${import.meta.env.VITE_CUSTOMERS_API_BASE_URL}/customers`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const { _links, ...json } = (await response.json()) as CustomerJson;
  const id = Number(/\/(\d+)$/.exec(_links.self.href)![1]);
  return { ...json, id };
}
