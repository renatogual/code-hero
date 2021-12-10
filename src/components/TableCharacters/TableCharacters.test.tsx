import { render, screen, fireEvent } from "@testing-library/react";
import { Characters } from "../../types";

import { TableCharacters } from ".";

const mockItems: Characters[] = [
  {
    id: 1,
    name: "Character 1",
    thumbnail: {
      path: "http:",
      extension: "jpg",
    },
    series: {
      items: [
        {
          name: "series 1",
        },
      ],
    },
    events: {
      items: [
        {
          name: "event 1",
        },
      ],
    },
  },
];

describe("TableCharacter Component", () => {
  it("should renders list of characters", () => {
    const onSelected = jest.fn();

    render(<TableCharacters items={mockItems} onSelected={onSelected} />);

    expect(screen.getByText("Character 1")).toBeInTheDocument();
  });

  it("should be execute the function onClick row", () => {
    const onSelected = jest.fn();

    render(<TableCharacters items={mockItems} onSelected={onSelected} />);

    const row = screen.getByTestId("row-character");

    fireEvent.click(row);

    expect(onSelected).toBeCalled();
  });

  it("should renders alert message to items is empty", () => {
    const onSelected = jest.fn();

    render(<TableCharacters items={[]} onSelected={onSelected} />);

    expect(
      screen.getByText("Não foram encontrados dados deste personagem !")
    ).toBeInTheDocument();
  });
});
