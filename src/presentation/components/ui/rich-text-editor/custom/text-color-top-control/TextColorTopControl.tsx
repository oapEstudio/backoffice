import Typography from "@mui/material/Typography";
import type { Editor } from "@tiptap/core";
import { useState } from "react";
import { CustomBox } from "../../../box/CustomBox";
import { CustomPopover } from "../../../popover/CustomPopover";
import IconButton from "@mui/material/IconButton";
import { ColorTextIcon } from "../../../icons";
import { Swatch } from "../swatch/Swatch";
import { selectWholeParagraphIfEmpty } from "../utils/selectWholeParagraphIfEmpty";

const PALETTE_TEXT = [
  '#000000', '#ffffff', '#888888', '#ff0000', '#ff9900',
  '#ffff00', '#00d000', '#0000ff', '#800080', '#00bcd4',
  '#795548', '#9e9e9e',
];

export const TextColorTopControl: React.FC<{ editor: Editor }> = ({ editor }) => {
  
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const onPick = (c?: string) => {
    selectWholeParagraphIfEmpty(editor);
    const chain = editor.chain().focus();
    c ? chain.setColor(c).run() : chain.unsetColor().run();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small"  onClick={(e) => setAnchorEl(e.currentTarget)}>
        <ColorTextIcon />
      </IconButton>
      <CustomPopover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        PaperProps={{ sx: { p: 1.5 } }}
      >
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          Elegí un color
        </Typography>
        <CustomBox
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 24px)',
            gap: 1,
            mb: 1,
          }}
        >     
          <Swatch onPick={onPick} />
          {PALETTE_TEXT.map((c) => (
            <Swatch key={c} color={c} onPick={onPick} />
          ))}
        </CustomBox>
      </CustomPopover>
    </>
  );
};
