import type { Editor } from "@tiptap/core";

export function selectWholeParagraphIfEmpty(editor: Editor) {
  const { state } = editor;
  const sel: any = state.selection;
  if (!sel || !sel.empty) return;
  const from = sel.$from.start();
  const to = sel.$from.end();
  editor.chain().setTextSelection({ from, to }).run();
}
