'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 border-b border-gray-200">
      <Link href="/">Home</Link>
      <Link href="/filmmaking">Filmmaking</Link>
      <Link href="/life">Life</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}