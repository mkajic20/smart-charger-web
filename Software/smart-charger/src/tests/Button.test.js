import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../components/Button/Button";

describe("Button Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Button />);
    expect(container.firstChild).toBeDefined();
  });

  it("renders button text correctly", () => {
    const buttonText = "Click me";
    const { getByText } = render(<Button buttonText={buttonText} />);
    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it("calls onClick prop when button is clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock} buttonText="Click me" />
    );
    fireEvent.click(getByText("Click me"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("applies secondary style when isSecondary is true", () => {
    const { container } = render(<Button isSecondary={true} />);
    expect(container.firstChild).toHaveAttribute("issecondary", "true");
  });

  it("does not apply secondary style when isSecondary is false", () => {
    const { container } = render(<Button isSecondary={false} />);
    expect(container.firstChild).toHaveAttribute("issecondary", "false");
  });

  it("disables the button when isDisabled is true", () => {
    const { getByText } = render(
      <Button isDisabled={true} buttonText="Click me" />
    );
    expect(getByText("Click me")).toBeDisabled();
  });

  it("does not disable the button when isDisabled is false", () => {
    const { getByText } = render(
      <Button isDisabled={false} buttonText="Click me" />
    );
    expect(getByText("Click me")).not.toBeDisabled();
  });
});
