import styled from "styled-components";

interface Props {
  className: string;
  green?: boolean;
  red?: boolean;
  disabled?: boolean;
  activable?: boolean;
}

const Icon = styled.i<Props>`
  font-size: 1.5em;
  color: ${(props) =>
    props.green
      ? "#4e6950"
      : props.red
      ? "#7a5140"
      : props.disabled
      ? "#aaa"
      : "#131313"};
  &:hover {
    cursor: ${(props) =>
      props.activable && !props.disabled ? "pointer" : "default"};
  }
`;

export default Icon;

export { Icon };
