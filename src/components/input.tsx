import { styled } from "styled-components"

export const StyledInput = styled.input`

    @keyframes gradientMove {
        0% {
            background-position: 0% 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
    }
     background: linear-gradient(to right, #786be6, #f57f7f);
    border: 1px solid #ccc;
    animation: gradientMove 8s ease infinite;
    background-size: 200% 200%;
    padding: 20px 40px;
`