import type {ButtonHTMLAttributes} from "react";
import cls from "classnames";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
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

export function PrimaryButton({className, isLoading, ...props}: ButtonProps) {
    return (
        <Button
            {...props}
            className={cls(
                'text-white bg-green-600 hover:bg-green-400',
                isLoading ? 'bg-green-400' : '',
                className
            )}
        >
            {props.children}
        </Button>
    )
}

export function DeleteButton({className, isLoading, ...props}: ButtonProps) {
    return (
        <Button
            {...props}
            className={cls(
                'hover:text-white hover:border-red-400',
                isLoading ? 'border-red-400 text-red-400': '',
                className
            )}
        >
            {props.children}
        </Button>
    )
}