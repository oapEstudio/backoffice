import { LinkedinIcon } from "../components/ui/icons";

export function convertLinks(linkedin: string) {
  return (
    <a
      href={linkedin}
      style={{ color: "inherit", textDecoration: "none" }}
      target="_BLANK"
    >
      <LinkedinIcon/>
    </a>
  );
} 