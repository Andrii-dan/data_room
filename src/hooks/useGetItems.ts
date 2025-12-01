import { useQuery } from '@tanstack/react-query'

import { getItems } from '@/services'

export const useGetItems = (parentId: string | null = null) => useQuery(getItems(parentId))
