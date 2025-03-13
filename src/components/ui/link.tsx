
import * as React from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80",
        destructive: "text-destructive hover:text-destructive/80",
        muted: "text-muted-foreground hover:text-foreground",
      },
      underline: {
        default: "no-underline hover:underline",
        always: "underline hover:no-underline",
        none: "no-underline",
      },
    },
    defaultVariants: {
      variant: "default",
      underline: "default",
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  external?: boolean;
  to?: string;
  href?: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, underline, external, children, to, href, ...props }, ref) => {
    const relValues = external ? "noopener noreferrer" : props.rel;
    const targetValue = external ? "_blank" : props.target;

    if (to) {
      return (
        <RouterLink
          ref={ref}
          to={to}
          className={cn(linkVariants({ variant, underline, className }))}
          target={targetValue}
          rel={relValues}
          {...(props as RouterLinkProps)}
        >
          {children}
        </RouterLink>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant, underline, className }))}
        target={targetValue}
        rel={relValues}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

export { Link, linkVariants };
