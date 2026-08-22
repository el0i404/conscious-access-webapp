import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/attendee/test/$testToken')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/attendee/test/$testToken"!</div>
}
