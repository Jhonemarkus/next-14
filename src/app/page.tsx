import Link from 'next/link'

export default function Home() {
  return (
    <main className='m-8 grid grid-cols-3 gap-2'>
      <Link href={"/prt"} className='border border-black p-2'>
        PRT
      </Link>
      <Link href={"/collections"} className='border border-black p-2'>
        Collections
      </Link>
    </main>
  )
}
