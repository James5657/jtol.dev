import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: ButtonVariant;
    }
>;

export default function Button({
    children,
    className = "",
    type = "button",
    variant = "primary",
    ...props
}: ButtonProps) {
    const classes = `button button-${variant} ${className}`.trim();

    return (
        <button className={classes} type={type} {...props}>
            {children}
        </button>
    );
}
