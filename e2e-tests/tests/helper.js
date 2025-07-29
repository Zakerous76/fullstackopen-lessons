const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "login" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
};
const createNote = async (page, content) => {
  await page.getByRole("button", { name: "Create Note" }).click();
  await page.getByRole("textbox").fill(content);
  await page.getByRole("button", { name: "Important (No)" }).click();
  await page.getByRole("button", { name: "save" }).click();
};

export { loginWith, createNote };
