interface CustomersResponseJson {
  _embedded: {
    customers: Array<
      Customer & {
        _links: {
          self: { href: string };
          customer: { href: string };
          trainings: { href: string };
        };
      }
    >;
  };
}

export async function loadCustomers(): Promise<Array<CustomerEntity>> {
  const response = await fetch(
    `${import.meta.env.VITE_CUSTOMERS_API_BASE_URL}/customers`
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const json: CustomersResponseJson = await response.json();
  return json._embedded.customers.map((customer) => {
    const id = Number(/\/(\d+)$/.exec(customer._links.self.href)![1]);
    return {
      ...customer,
      id,
    };
  });
}
