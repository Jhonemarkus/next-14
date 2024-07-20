export type NewCollectionForm = {
  name: string,
  success?: boolean,
  error?: string
}

export async function createCollection(prevState: NewCollectionForm, data: FormData): Promise<NewCollectionForm> {
  // TOOD validate and save collection
  console.log('create collection', { prevState, data})
  return {
    name: data.get('name') as string,
    success: false,
    error: 'Not implemented'
  };
}
