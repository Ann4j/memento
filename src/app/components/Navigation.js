"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();
    return (
        <nav className="p-4 flex gap-4 justify-center">
            <Link href={'/habits'}
            className={pathname === '/habits' ? 'text-blue-500 font-bold' : ''}>
                Habits
            </Link>
            <Link href={'/calendar'}
             className={pathname === '/calendar' ? 'text-blue-500 font-bold' : ''}>
                Сalendar
            </Link>
        </nav>
    )
}