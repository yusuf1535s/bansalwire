export function PageMeta({ title, description }: { title: string; description?: string }) {
  return (
    <>
      <title>{title} | Bansal Wire Industries</title>
      <meta name="description" content={description || title} />
    </>
  )
}
