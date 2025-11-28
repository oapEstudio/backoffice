import IconButton from "@mui/material/IconButton";
import type { Editor } from "@tiptap/core";
import { useState } from "react";
import { CustomPopover } from "../../../popover/CustomPopover";
import { ColorFillIcon } from "../../../icons";
import Typography from "@mui/material/Typography";
import { CustomBox } from "../../../box/CustomBox";
import { Swatch } from "../swatch/Swatch";
import { selectWholeParagraphIfEmpty } from "../utils/selectWholeParagraphIfEmpty";
import { PALETTE_COLORS_ELEMENTS } from "../../../../../common/palette-colors-elements";

export const HighlightTopControl: React.FC<{ editor: Editor, palette?: string[] }> = ({ editor, palette = PALETTE_COLORS_ELEMENTS }) => {
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
          {palette.map((c) => (
            <Swatch key={c} color={c} onPick={onPick} />
          ))}
        </CustomBox>
      </CustomPopover>
    </>
  );
};