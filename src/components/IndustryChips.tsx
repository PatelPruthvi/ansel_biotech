import { Link } from "wouter";
import { industriesWeServe, industryChipClassName } from "@/data/siteStructure";
import { cn } from "@/lib/utils";

/** Shared Industries We Serve chips — Products hero (and reusable elsewhere). */
export function IndustryChips({
  className,
  chipClassName,
}: {
  className?: string;
  chipClassName?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {industriesWeServe.map((ind) => (
        <Link
          key={ind.id}
          href={ind.href}
          className={cn(industryChipClassName, chipClassName)}
        >
          <span className="text-[0.75rem] leading-none" aria-hidden>
            {ind.emoji}
          </span>
          <span>{ind.name}</span>
        </Link>
      ))}
    </div>
  );
}
