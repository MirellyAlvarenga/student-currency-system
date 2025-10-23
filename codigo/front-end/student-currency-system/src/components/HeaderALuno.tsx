"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

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
        <Link href="/Aluno/Dashboard" className="text-2xl font-bold">
          Sistema monetário
        </Link>

        <nav className="flex gap-6">
          <Link
            href="/"
            className={`hover:underline ${
              pathname === "/" ? "font-bold underline" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/Aluno/list"
            className={`hover:underline ${
              pathname === "/Aluno" ? "font-bold underline" : ""
            }`}
          >
            Alunos
          </Link>
          <Link
            href="/EmpresaParceira/list"
            className={`hover:underline ${
              pathname === "/cliente/list" ? "font-bold underline" : ""
            }`}
          >
            Empresas
          </Link>
        </nav>
      </div>
    </header>
  );
}