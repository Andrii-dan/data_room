import { Fragment } from 'react/jsx-runtime'
import { Link, useNavigate, useParams } from 'react-router'
import { useMedia } from 'react-use'
import { Home } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useGetBreadcrumbs } from '@/hooks'
import { PATHS } from '@/lib'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { TextTruncate } from '../ui/text-truncate'

const MAX_CRUMBS = 4

export function Breadcrumbs() {
  const { folderId } = useParams()
  const navigate = useNavigate()

  const { data } = useGetBreadcrumbs(folderId)

  const crumbs = data ?? []
  const total = crumbs.length

  // If there are to many folders in the path or view port is smaller than tailwind xl breakpoint,
  // show breadcrumbs in dropdown menu
  const shouldCollapse = useMedia('(max-width: 1279px)') || total > MAX_CRUMBS

  const middle = crumbs.slice(0, -1)
  const current = crumbs.at(-1)

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

        {total > 0 && <BreadcrumbSeparator />}

        {/* Middle  */}
        {shouldCollapse && middle.length > 0 ? (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1" asChild>
                  <BreadcrumbEllipsis className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {middle.map(({ id, name }) => (
                    <DropdownMenuItem key={id} onClick={() => navigate(`${PATHS.dashboard}/${id}`)}>
                      <TextTruncate text={name} />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
          </>
        ) : (
          middle.map(({ id, name }) => (
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
          ))
        )}

        {/* Current */}
        {total > 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage>
              <TextTruncate text={current?.name ?? ''} maxLength={30} />
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
