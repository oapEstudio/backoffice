import { useEffect, useRef, useState } from "react";

import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";


import Button from "../button/button.component";


interface ICustomRichTextEditorProps{
  change: (value: string)=>void;
}
export const CustomRichTextEditor: React.FC<ICustomRichTextEditorProps> = ({change}) => {

 const rteRef = useRef<RichTextEditorRef>(null);

 const [html, setHtml] = useState<string>("<p>Hello world</p>");

 
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
        extensions={[StarterKit]} 
        content={html}       
        renderControls={() => (
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
          </MenuControlsContainer>
        )}
      />

      <Button variant={'primary'} onClick={() => console.log(rteRef.current?.editor?.getHTML())}  title={'Log HTML'}/>
        
     
    </div>
  );
}
