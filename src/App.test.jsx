import { describe, it, expect } from "vitest";
import MainNavigation from "./components/Layout/MainNavigation"
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store/main";
describe("MainNavigation component", () => {
  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    );
    const linkElement = screen.getByText(/0/i);
    expect(linkElement).toBeTruthy();
  });
  it("renders zero unread email count", () => {
    render(
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    );
     const countElements = screen.getAllByText(/0/i);
     expect(countElements[0]).toBeTruthy();
  });
});
