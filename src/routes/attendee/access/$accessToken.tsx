import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/attendee/access/$accessToken')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/attendee/access/$accessToken"!</div>
}
