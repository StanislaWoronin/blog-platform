export const baseSaUrl = 'sa/users'

export const SaEndpoints = {
  create: () => baseSaUrl,
  getUser: () => baseSaUrl,
  updateBanStatus: (id: string) => `${baseSaUrl}/${id}/ban`,
  deleteUser: (id: string) => `${baseSaUrl}/${id}`,
}