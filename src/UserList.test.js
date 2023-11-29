import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

const renderComponent = () => {
  const users = [
    {
      name: "jane",
      email: "jane@gmail.com",
    },
    {
      name: "sam",
      email: "same@gmail.com",
    },
  ];
  const { container } = render(<UserList users={users} />);

  return {
    users,
  };
};

test("Render one row per user", async () => {
  //Find all the rows in the table
  //   screen.logTestingPlaygroundURL();
  const { users } = renderComponent();
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // const table = container.querySelector("table");

  // //eslint-disable-next-line
  // const rows = container.querySelectorAll("tbody tr");

  expect(rows).toHaveLength(2);
});

test("Render the email and name of each user", () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
