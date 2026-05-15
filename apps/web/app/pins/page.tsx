import { PinGrid } from "@/components/pages/pins/pin-grid"

export const dynamic = "force-static"
export const revalidate = false

export default function PinsPage() {
  return <PinGrid />
}
