import React, { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
    path: string;
    label: string;
}

export const RedirectButton: FC<IProps> = ({ path, label }) => {
    const pathname = usePathname();
    const isActive = pathname === path;

    return (
        <Link
            href={path}
            className={`text-lg ${isActive ? "font-bold underline" : "hover:underline"
                }`}
        >
            {label}
        </Link>
    );
};
