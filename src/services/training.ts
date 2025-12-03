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
  return allTrainings.filter((training) => training.customer?.id === customerId);
}
