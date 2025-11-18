import { useEffect, useRef, useState } from "react";

import StarterKit from "@tiptap/starter-kit";
import { Color, TextStyle, TextStyleKit } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { OrderedList } from "@tiptap/extension-ordered-list";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Underline } from "@tiptap/extension-underline";
import { Highlight } from "@tiptap/extension-highlight";

import {
  FontSize,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonHighlightColor,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonTextColor,
  MenuButtonUnderline,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectFontSize,
  MenuSelectHeading,
  MenuSelectTextAlign,
  RichTextEditor,
  RichTextReadOnly,
  type RichTextEditorRef,
} from "mui-tiptap";


import Button from "../button/button.component";
import { theme } from "../../../common/styles";
import type { Extensions } from "@tiptap/core";


interface ICustomRichTextEditorProps{
  change: (value: string)=>void;
}

const extensions: Extensions = [
                      StarterKit, 
                      TextStyle, 
                      Color,                    
                      FontSize,                     
                      Highlight.configure({ multicolor: true }),
                      TextAlign.configure({types: ['heading', 'paragraph'],}),
                    ];
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
        extensions={extensions} 
        content={html}       
        renderControls={() => (
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuSelectFontSize  />
            <MenuSelectTextAlign />
            <MenuButtonUnderline />
            <MenuButtonOrderedList />
            <MenuButtonTextColor
              defaultTextColor={theme.palette.text.primary}
              swatchColors={[
                { value: "#000000", label: "Black" },
                { value: "#ffffff", label: "White" },
                { value: "#888888", label: "Grey" },
                { value: "#ff0000", label: "Red" },
                { value: "#ff9900", label: "Orange" },
                { value: "#ffff00", label: "Yellow" },
                { value: "#00d000", label: "Green" },
                { value: "#0000ff", label: "Blue" },
              ]}
            />
            <MenuButtonHighlightColor
              swatchColors={[
                { value: "#595959", label: "Dark grey" },
                { value: "#dddddd", label: "Light grey" },
                { value: "#ffa6a6", label: "Light red" },
                { value: "#ffd699", label: "Light orange" },              
                { value: "#ffff00", label: "Yellow" },
                { value: "#99cc99", label: "Light green" },
                { value: "#90c6ff", label: "Light blue" },
                { value: "#8085e9", label: "Light purple" },
              ]}
            />
            <MenuButtonBulletedList />
            
          </MenuControlsContainer>
        )}
      />

        
     
    </div>
  );
}



export const CustomRichTextView: React.FC<{content: string}> = ({content})=>{

  return <RichTextReadOnly 
            content={content} 
            extensions={extensions} 
        />
}