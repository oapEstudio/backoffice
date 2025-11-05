import { useEffect, useRef, useState } from "react";

import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Text from '@tiptap/extension-text';

import {
  FontSize,
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectFontSize,
  MenuSelectHeading,
  MenuSelectTextAlign,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";


import Button from "../button/button.component";


interface ICustomRichTextEditorProps{
  change: (value: string)=>void;
}
export const CustomRichTextEditor: React.FC<ICustomRichTextEditorProps> = ({change}) => {

 const rteRef = useRef<RichTextEditorRef>(null);

 const [html, setHtml] = useState<string>("");

 
  useEffect(() => {
    const editor = rteRef.current?.editor;

    if (!editor || editor.isDestroyed) return;

    const handleUpdate = () => {
      setHtml(editor.getHTML());  
      change(editor.getHTML());      
    };

    editor.on("update", handleUpdate);
   
    return () => {
      editor.off("update", handleUpdate);
    };
  }, [rteRef.current?.editor]);

  return (
     <div>
      <RichTextEditor
        ref={rteRef}
        extensions={[StarterKit, TextStyleKit, Text, TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),]} 
        content={html}       
        renderControls={() => (
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuSelectFontSize  />
            <MenuSelectTextAlign />
          </MenuControlsContainer>
        )}
      />

        
     
    </div>
  );
}
