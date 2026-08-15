import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Icons";

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "dark" | "outline";
  className?: string;
};

export function ActionLink({
  href,
  children,
  variant = "dark",
  className = "",
}: ActionLinkProps) {
  return (
    <Link className={`action-link action-link--${variant} ${className}`} href={href}>
      <span className="action-link__label">{children}</span>
      <span className="action-link__icon">
        <ArrowIcon />
      </span>
    </Link>
  );
}
