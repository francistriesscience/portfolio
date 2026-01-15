import Link from "next/link"

export function Footer() {
  return (
    <div className="mx-auto flex w-full flex-row items-center justify-between gap-2 pt-10">
      <div className="text-muted-foreground text-xs">
        Build by{" "}
        <Link
          href="https://linkedin.com/in/francistriesscience"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium underline decoration-dashed underline-offset-2"
        >
          Francis Ignacio
        </Link>
      </div>
    </div>
  )
}
