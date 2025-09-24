import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theta-purple focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary - Theta Purple, solid and confident
        default: "bg-theta-purple text-white hover:bg-theta-purple-dark hover:-translate-y-0.5 shadow-sm",
        // Secondary - Solid surface with border
        secondary: "bg-surface-mid text-foreground border border-border hover:bg-surface-high hover:border-theta-purple",
        // Outline - Clean border style
        outline: "border-2 border-theta-purple text-theta-purple bg-transparent hover:bg-theta-purple hover:text-white",
        // Ghost - Subtle hover
        ghost: "text-foreground hover:bg-surface-mid",
        // Destructive - Clear error state
        destructive: "bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5",
        // Success - Clear success state
        success: "bg-green-600 text-white hover:bg-green-700 hover:-translate-y-0.5",
        // Link - Text only
        link: "text-theta-purple underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded",
        default: "h-10 px-4 text-sm rounded",
        lg: "h-12 px-6 text-base rounded",
        xl: "h-14 px-8 text-lg rounded",
        icon: "h-10 w-10 rounded",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
