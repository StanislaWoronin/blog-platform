export const baseSaUrl = 'sa/users';

export const SaEndpoints = {
  create: (itUrl?: boolean) => {
    if (itUrl) return `/${baseSaUrl}`;
    return '';
  },
  getUsers: (itUrl?: boolean) => {
    if (itUrl) return `/${baseSaUrl}`;
    return '';
  },
  updateBanStatus: (id: string, itUrl?: boolean) => {
    const updateBanStatusEndpoint = `${id}/ban`;
    if (itUrl) {
      return `/${baseSaUrl}/${updateBanStatusEndpoint}`;
    }
    return updateBanStatusEndpoint;
  },
  deleteUser: (id: string, itUrl?: boolean) => {
    const deleteUrl = `${id}`;
    if (itUrl) {
      return `/${baseSaUrl}/${deleteUrl}`;
    }
    return deleteUrl;
  },
};
