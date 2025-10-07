export function getColors(
  primaryHxc: string,
  secondaryHxc: string,
  length: number
): string[] {
  const baseColors = [primaryHxc, secondaryHxc, "#F9F9FD"];

  if (length <= 3) {
    return baseColors.slice(0, length);
  } else {
    // Generar una gama de colores entre primaryHxc y secondaryHxc
    const colors = [baseColors[0]];
    // const steps = length - 1;
    const startColor = parseInt(primaryHxc.replace("#", "0"), 16);
    const endColor = parseInt(secondaryHxc.replace("#", "0"), 16);
    const stepSize = (endColor - startColor) / length;

    for (let i = 1; i < length; i++) {
      const newColor = startColor + stepSize * i;
      colors.push(`#${Math.round(newColor).toString(16).padStart(6, "0")}`);
    }

    // colors.push(baseColors[2]);
    return colors;
  }
}
