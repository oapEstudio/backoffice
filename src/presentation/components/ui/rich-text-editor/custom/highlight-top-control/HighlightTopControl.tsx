import IconButton from "@mui/material/IconButton";
import type { Editor } from "@tiptap/core";
import { useState } from "react";
import { CustomPopover } from "../../../popover/CustomPopover";
import { ColorFillIcon } from "../../../icons";
import Typography from "@mui/material/Typography";
import { CustomBox } from "../../../box/CustomBox";
import { Swatch } from "../swatch/Swatch";
import { selectWholeParagraphIfEmpty } from "../utils/selectWholeParagraphIfEmpty";

const PALETTE_BG = [
  '#595959', '#dddddd', '#ffa6a6', '#ffd699', '#ffff00',
  '#99cc99', '#90c6ff', '#8085e9', '#c8e6c9', '#ffe0b2',
  '#e1bee7', '#f8bbd0',
];


export const HighlightTopControl: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const onPick = (c?: string) => {
    selectWholeParagraphIfEmpty(editor);
    const chain = editor.chain().focus();
    c ? chain.setHighlight({ color: c }).run() : chain.unsetHighlight().run();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <ColorFillIcon />
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
          Elegí un fondo
        </Typography>
        <CustomBox
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 24px)',
            gap: 1,
          }}
        >
    
          <Swatch onPick={onPick} />
          {PALETTE_BG.map((c) => (
            <Swatch key={c} color={c} onPick={onPick} />
          ))}
        </CustomBox>
      </CustomPopover>
    </>
  );
};