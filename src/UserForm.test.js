import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("It shows two inputs and a button", () => {
  //render the component
  render(<UserForm />);

  //Manipulate the component of find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  //Assertion-make sure the component is doing
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();

  //what we expect it to do
});

test("It is called when the user is added to the list", async () => {
  //   const argList = [];
  //   const callback = (...args) => {
  //     argList.push(args);
  //   };
  const mock = jest.fn();

  render(<UserForm onUserAdd={mock} />);
  //   const [nameInput, emailInput] = screen.getAllByRole("textbox");
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  await user.click(nameInput);
  await user.keyboard("jane");

  await user.click(emailInput);
  await user.keyboard("jane@gmail.com");

  const button = screen.getByRole("button");

  user.click(button);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "jane", email: "jane@gmail.com" });

  //   expect(argList).toHaveLength(1);
  //   expect(argList[0][0]).toEqual({ name: "jane", email: "jane@gmail.com" });
});

test("empties the two inputs when form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  await user.click(nameInput);
  await user.keyboard("jane");
  await user.click(emailInput);
  await user.keyboard("jane@jane.com");

  const button = screen.getByRole("button");
  user.click(button);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
