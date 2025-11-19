import { useEffect, useRef, useState } from "react";

import StarterKit from "@tiptap/starter-kit";
import { Color, TextStyle } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { Highlight } from "@tiptap/extension-highlight";
import { Link } from "@tiptap/extension-link";
import {
  FontSize,
  LinkBubbleMenu,
  LinkBubbleMenuHandler,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonEditLink,
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

const CustomLinkExtension = Link.extend({
  inclusive: false,
});
const extensions: Extensions = [
                      StarterKit, 
                      TextStyle, 
                      Color,                    
                      FontSize,                     
                      Highlight.configure({ multicolor: true }),
                      TextAlign.configure({types: ['heading', 'paragraph'],}),
                      CustomLinkExtension.configure({
                      // autolink is generally useful for changing text into links if they
                      // appear to be URLs (like someone types in literally "example.com"),
                      // though it comes with the caveat that if you then *remove* the link
                      // from the text, and then add a space or newline directly after the
                      // text, autolink will turn the text back into a link again. Not ideal,
                      // but probably still overall worth having autolink enabled, and that's
                      // how a lot of other tools behave as well.
                      autolink: true,
                      linkOnPaste: true,
                      openOnClick: false,
                    }),
                    LinkBubbleMenuHandler,
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
            <MenuButtonEditLink />
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
        )}>

           {() => (
          <>
            <LinkBubbleMenu />
          
          </>
        )}
        </RichTextEditor>
      

        
     
    </div>
  );
}



export const CustomRichTextView: React.FC<{content: string}> = ({content})=>{

  return <RichTextReadOnly 
            content={content} 
            extensions={extensions} 
        />
}