import { useEffect, useMemo, useRef, useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import { Color, TextStyle } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { Highlight } from "@tiptap/extension-highlight";
import { Link } from "@tiptap/extension-link";
import { theme } from "../../../common/styles";
import type { Extensions } from "@tiptap/core";

import {
  FontSize,
  LinkBubbleMenu,
  LinkBubbleMenuHandler,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonEditLink,
  MenuButtonHighlightColor,
  MenuButtonImageUpload,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonTextColor,
  MenuButtonUnderline,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectFontSize,
  MenuSelectHeading,
  MenuSelectTextAlign,
  ResizableImage,
  RichTextEditor,
  RichTextReadOnly,
  type RichTextEditorRef,
} from "mui-tiptap";


interface ICustomRichTextEditorProps{
  change: (value: string)=>void;
}

const CustomLinkExtension = Link.extend({
  inclusive: false,

});

const common = [
  StarterKit, TextStyle, Color, FontSize,
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({ types: ['heading', 'paragraph', 'image', 'resizableImage'] }),
  LinkBubbleMenuHandler,
];

const extensionsEdit: Extensions = [
  ...common,
  ResizableImage,   
];

const extensionsView: Extensions = [
  ...common,          
  ResizableImage,   
];

const MAX_IMAGE_BYTES = 500 * 1024;

async function fileToDataUrlImage(file: File): Promise<string | null> {
  if (!file || !file.type?.startsWith('image/')) return null;
  if (file.size > MAX_IMAGE_BYTES) return null; // 500 KB

  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      
      const result = typeof reader.result === 'string' ? reader.result : null;
      resolve(result && result.startsWith('data:image/') ? result : null);
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
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
        extensions={extensionsEdit} 
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
           <MenuButtonImageUpload
              onUploadFiles={(files) => {

                   const results = files.map((file) => ({
                                  src: 'https://ypf.com/images/home/ruta.webp',
                                  alt: file.name,
                                }));

                  return results;
                }}
            />  
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

  
 
  return (
    <RichTextReadOnly
      content={content}
      extensions={extensionsView}
    />
  );
}