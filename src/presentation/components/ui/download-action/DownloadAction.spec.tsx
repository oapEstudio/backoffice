import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DownloadAction } from "./DownloadAction";

describe("UI/DownloadAction", () => {
  const label = "Documento";
  const url = "https://example.com/file.pdf";

  it("debe renderizar el label recibido", () => {
    render(<DownloadAction label={label} url={url} />);
    const el = screen.getByText(label);
    expect(el).toBeTruthy();
    expect(el.textContent).toBe(label);
  });

  it("debe crear un elemento <a> y ejecutar click al descargar", () => {
    const createSpy = vi.spyOn(document, "createElement");

    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click");

    render(<DownloadAction label={label} url={url} />);

    const btn = screen.getByLabelText(/descargar/i);
    fireEvent.click(btn);

    expect(createSpy).toHaveBeenCalledWith("a");
    expect(clickSpy).toHaveBeenCalled();

    createSpy.mockRestore();
    clickSpy.mockRestore();
  });

  it("debe mostrar el tooltip al hacer hover sobre el botón", async () => {
    render(<DownloadAction label={label} url={url} />);

    const btn = screen.getByLabelText(/descargar/i);
    fireEvent.mouseOver(btn);

    const tooltip = await screen.findByText("Descargar archivo");
    expect(tooltip).toBeTruthy();
    expect(tooltip.textContent).toContain("Descargar archivo");
  });
});
