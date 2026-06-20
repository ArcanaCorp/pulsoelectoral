'use client';

import { IconBolt, IconLayout, IconTimeline } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar () {

    const pathname = usePathname();

    return (
        <nav className="sidebar">
            <div className="sidebar-content">
                <div className=""></div>
                <ul className="sidebar-menu">
                    <li>
                        <Link href={'/dashboard'} className={`sidebar-item ${pathname === '/dashboard' && 'sidebar-item-active'}`}><span className="sidebar-icon"><IconLayout/></span> Inicio</Link>
                    </li>
                    <li>
                        <Link href={'/dashboard/intelligence'} className={`sidebar-item ${pathname === '/dashboard/intelligence' && 'sidebar-item-active'}`}><span className="sidebar-icon"><IconTimeline/></span> Inteligencia Electoral</Link>
                    </li>
                    <li>
                        <Link href={'/dashboard/actions'} className={`sidebar-item ${pathname === '/dashboard/actions' && 'sidebar-item-active'}`}><span className="sidebar-icon"><IconBolt/></span> Acciones Electoral</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}