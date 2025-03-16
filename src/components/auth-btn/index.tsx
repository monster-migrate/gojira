import { JSX } from "react";
import { Button } from "../ui/button";

interface PropsInterface {
    disabled?: boolean;
    children?: React.ReactNode;
    variant?: "default" | "outline";
    clickHandler?: () => void;
}
const AuthBtn = (props: PropsInterface): JSX.Element => {
    const { children, variant, disabled, clickHandler } = props;
    const renderContent = (children: React.ReactNode) => {
        if (disabled) {
            return (
                <span>
                    {children}
                </span>
            );
        } else {
            return (
                <span onClick={clickHandler}>
                    {children}
                </span>
            );
        }
    };
    return (
        <Button
            variant={variant}
            disabled={disabled}
            className="px-8 bg-emerald-700"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,1)" }}
        >
            {renderContent(children)}
        </Button>
    )
}
export default AuthBtn;