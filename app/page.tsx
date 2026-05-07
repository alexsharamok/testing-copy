import { redirect } from 'next/navigation'

type Props = {
  searchParams: Promise<{ token?: string }>
}

export default async function Page({ searchParams }: Props) {
  const { token } = await searchParams

  redirect(token ? `/index.html?token=${encodeURIComponent(token)}` : '/index.html')
}