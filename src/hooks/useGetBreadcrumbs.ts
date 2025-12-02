import { useQuery } from '@tanstack/react-query'

import { getBreadcrumbs } from '@/services'

export const useGetBreadcrumbs = (folderId: string | null = null) =>
  useQuery(getBreadcrumbs(folderId))
