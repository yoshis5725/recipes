import React from "react";
import cls from "classnames";


interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    name?: string;
}


export function Button({children, className, ...props}: ButtonProps) {
    return (
        <button
            className={cls('flex px-3 py-2 rounded-md justify-center', className)}
            {...props}
        >
            {children}
        </button>
    )
}

export function PrimaryButton({className, ...props}: ButtonProps) {
    return (
        <Button
            {...props}
            className={cls('text-white bg-primary hover:bg-primary-light', className)}
        >
            {props.children}
        </Button>
    )
}