import type { Metadata } from "next";
import Link from "next/link";
import { MushroomMark } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="not-found">
      <MushroomMark />
      <span>404</span>
      <h1>Эта страница<br />ещё не выросла</h1>
      <p>Вернитесь на главную или откройте раздел с продукцией.</p>
      <div><Link href="/">На главную</Link><Link href="/products">Продукция</Link></div>
    </section>
  );
}
