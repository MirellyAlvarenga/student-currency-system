"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const navLinks = [
  { href: "/", label: "Dashboard", match: "/" },
  { href: "/Aluno/list", label: "Alunos", match: "/Aluno" },
  { href: "/EmpresaParceira/list", label: "Empresas", match: "/EmpresaParceira" },
];

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link href={href} className={`hover:underline ${active ? "font-bold underline" : ""}`}>
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();

  const excludedPaths = ["/auth/login", "/auth/register", "/"];
  if (excludedPaths.includes(pathname)) {
    return null;
  }

  return (
    <header
      className={`${poppins.className} bg-[#003366] text-white shadow-md justify-items-center`}
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/EmpresaParceira/dashboard" className="text-2xl font-bold">
          Sistema monetário
        </Link>

        <nav className="flex gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} active={pathname?.startsWith(link.match) ?? false} />
          ))}
        </nav>
      </div>
    </header>
  );
}