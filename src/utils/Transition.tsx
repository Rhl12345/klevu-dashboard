import { useRef, useEffect, useContext, createContext, FC } from "react";
import { CSSTransition as ReactCSSTransition } from "react-transition-group";


interface TransitionContextProps {
    parent: {
        appear?: string;
        show?: boolean;
        isInitialRender?: boolean | any;
    };
}
const TransitionContext = createContext<TransitionContextProps>({
    parent: {
        appear: "false",
        show: false,
        isInitialRender: false,
    },
});

function useIsInitialRender() {
    const isInitialRender = useRef(true);
    useEffect(() => {
        isInitialRender.current = false;
    }, []);
    return isInitialRender.current;
}

interface CSSTransitionProps {
    show?: boolean;
    enter?: string;
    enterStart?: string;
    enterEnd?: string;
    leave?: string;
    leaveStart?: string;
    leaveEnd?: string;
    appear?: string | any;
    unmountOnExit?: string | any;
    children?: any,
}
const CSSTransition: FC<CSSTransitionProps> = ({
    show,
    enter = "",
    enterStart = "",
    enterEnd = "",
    leave = "",
    leaveStart = "",
    leaveEnd = "",
    appear,
    unmountOnExit,
    children,
    ...rest
}) => {
    const enterClasses = enter.split(" ").filter((s) => s.length);
    const enterStartClasses = enterStart.split(" ").filter((s) => s.length);
    const enterEndClasses = enterEnd.split(" ").filter((s) => s.length);
    const leaveClasses = leave.split(" ").filter((s) => s.length);
    const leaveStartClasses = leaveStart.split(" ").filter((s) => s.length);
    const leaveEndClasses = leaveEnd.split(" ").filter((s) => s.length);
    const removeFromDom = unmountOnExit;

    function addClasses(node: HTMLElement, classes: string[]) {
        classes.length && node.classList.add(...classes);
    }

    function removeClasses(node: HTMLElement, classes: string[]) {
        classes.length && node.classList.remove(...classes);
    }

    const nodeRef: any = useRef<HTMLDivElement>(null);

    return (
        <ReactCSSTransition
            appear={appear === true ? true : false}
            nodeRef={nodeRef}
            unmountOnExit={removeFromDom}
            in={show}
            addEndListener={(done: any) => {
                nodeRef.current?.addEventListener("transitionend", done, false);
            }}
            onEnter={() => {
                if (!removeFromDom) nodeRef.current.style.display = null;
                addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses]);
            }}
            onEntering={() => {
                removeClasses(nodeRef.current, enterStartClasses);
                addClasses(nodeRef.current, enterEndClasses);
            }}
            onEntered={() => {
                removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses]);
            }}
            onExit={() => {
                addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses]);
            }}
            onExiting={() => {
                removeClasses(nodeRef.current, leaveStartClasses);
                addClasses(nodeRef.current, leaveEndClasses);
            }}
            onExited={() => {
                removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses]);
                if (!removeFromDom) nodeRef.current.style.display = "none";
            }}
        >
            <div
                ref={nodeRef}
                {...rest}
                style={{ display: !removeFromDom ? "none" : '' }}
            >
                {children}
            </div>
        </ReactCSSTransition>
    );
}

interface TransitionProps {
    show?: boolean;
    appear?: string | any;
    className?: string;
    tag?: string;
    enter?: string;
    enterStart?: string;
    enterEnd?: string;
    leave?: string;
    leaveStart?: string;
    leaveEnd?: string;
    children?: any,
    id?: string,
    onClick?: () => void,
    style?: string | any,
    role?: string,
}
const Transition: FC<TransitionProps> = ({ show, appear, ...rest }) => {
    const { parent } = useContext(TransitionContext);
    const isInitialRender = useIsInitialRender();
    const isChild = show === undefined;

    if (isChild) {
        return (
            <CSSTransition
                unmountOnExit={undefined}
                children={undefined}
                appear={parent.appear || !parent.isInitialRender}
                show={parent.show}
                {...rest}
            />
        );
    }

    return (
        <TransitionContext.Provider
            value={{
                parent: {
                    show,
                    isInitialRender,
                    appear,
                },
            }}
        >
            <CSSTransition
                unmountOnExit={undefined}
                children={undefined}
                appear={appear}
                show={show}
                {...rest}
            />
        </TransitionContext.Provider>
    );
}

export default Transition;
