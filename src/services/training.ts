type TrainingJson = Omit<TrainingEntity, "date"> & { date: string };

export async function loadTrainings(): Promise<Array<TrainingEntity>> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/gettrainings`
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const json: Array<TrainingJson> = await response.json();
  return json.map(({ date, ...others }) => ({
    date: new Date(date),
    ...others,
  }));
}

export async function loadTrainingsByCustomerId(
  customerId: number
): Promise<Array<TrainingEntity>> {
  const allTrainings = await loadTrainings();
  return allTrainings.filter(
    (training) => training.customer?.id === customerId
  );
}

export async function addTraining(
  customerId: number,
  value: Partial<Training>
): Promise<TrainingEntity> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/trainings`,
    {
      method: "POST",
      body: JSON.stringify({
        ...value,
        customer: `${
          import.meta.env.VITE_API_BASE_URL
        }/customers/${customerId}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const json = await response.json();
  return json;
}

export async function removeTraining(trainingId: number): Promise<void> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/trainings/${trainingId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
}
