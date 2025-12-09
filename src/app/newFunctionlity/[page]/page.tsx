export default async function NewFunctionalityPage({
  params,
}: {
  params?: Promise<{ page?: string }>
}) {
  const resolvedParams = params ? await params : undefined
  const page = resolvedParams?.page ?? ""

  return <div>New Functionality Page {page}</div>
}