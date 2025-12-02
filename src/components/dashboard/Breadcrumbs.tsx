import { Fragment } from 'react/jsx-runtime'
import { Link, useParams } from 'react-router'
import { Home } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useGetBreadcrumbs } from '@/hooks'
import { PATHS } from '@/lib'

import { TextTruncate } from '../ui/text-truncate'

export function Breadcrumbs() {
  const { folderId } = useParams()
  const { data } = useGetBreadcrumbs(folderId)

  const crumbs = data ?? []
  const total = crumbs.length

  // TODO: Responsive breadcrumbs

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Root  */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={PATHS.dashboard}>
              <Home className="w-4 h-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Middle  */}
        {crumbs.slice(0, -1).map(({ id, name }) => (
          <Fragment key={id}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`${PATHS.dashboard}/${id}`}>
                  <TextTruncate text={name} maxLength={20} />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}

        {/* Current */}
        {total > 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage>{crumbs[total - 1]?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
