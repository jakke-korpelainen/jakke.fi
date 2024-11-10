import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="inline-flex flex-col flex-wrap justify-start gap-3 font-mono text-sm uppercase *:before:inline-block *:before:text-before *:before:content-['_//'] sm:gap-5 sm:text-2xl md:flex-row">
      {items.map((item) =>
        item.href ? (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ) : (
          <span key={item.label}>{item.label}</span>
        ),
      )}
    </div>
  );
}
