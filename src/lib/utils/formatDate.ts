import dayjs from 'dayjs'

export function formatDate(timestamp: number) {
  return dayjs(timestamp).format('DD MMM YYYY, HH:mm')
}
