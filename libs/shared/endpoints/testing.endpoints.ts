export const baseTestingUrl = 'testing';

export const testingEndpoints = {
  deleteAllData: (itUrl?: boolean) => {
    const allDataEndpoint = 'all-data'
    if (itUrl) return `/${baseTestingUrl}/${allDataEndpoint}`;
    return `${allDataEndpoint}`;
  }
}