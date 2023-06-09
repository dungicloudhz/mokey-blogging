import { LoadingSpiner } from "components/loading";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonStyles = styled.button`
    cursor: pointer;
    padding: 0 25px;
    line-height: 1;
    border-radius: 8px;
    font-weight: 600;
    font-size: 18px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${(props) => props.height || "70px"};
    color: white;
    background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
    );
    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;

const Button = ({
    type = "button",
    onClick = () => {},
    children,
    ...props
}) => {
    const { isLoading } = props;
    const child = !!isLoading ? <LoadingSpiner></LoadingSpiner> : children;
    return (
        <ButtonStyles type={type} onClick={onClick} {...props}>
            {child}
        </ButtonStyles>
    );
};

Button.propTypes = {
    type: PropTypes.oneOf(["button", "submit"]).isRequired,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
};

export default Button;
