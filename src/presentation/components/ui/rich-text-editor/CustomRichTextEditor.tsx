import { useEffect, useRef, useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import { Color, TextStyle } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { Highlight } from "@tiptap/extension-highlight";
import type { Editor, Extensions } from "@tiptap/core";
import React from 'react';

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
import { TextColorTopControl } from "./custom/text-color-top-control/TextColorTopControl";
import { HighlightTopControl } from "./custom/highlight-top-control/HighlightTopControl";


interface ICustomRichTextEditorProps{
  change: (value: string)=>void;
}



const common = [
  StarterKit, TextStyle, Color, FontSize,
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
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
        renderControls={() => {
          const editor = rteRef.current?.editor;
          return (
            <div style={{ 
        display: 'flex', 
        gap: 8, 
        alignItems: 'center',
        padding: 8,       
        overflow: 'visible',
        zIndex: 2
      }}>
              <MenuSelectHeading />
              <MenuDivider />
              <MenuButtonBold />
              <MenuButtonItalic />
              <MenuSelectFontSize  />
              <MenuSelectTextAlign />
              <MenuButtonEditLink />
              <MenuButtonUnderline />
              <MenuButtonOrderedList />
              {editor && (
                <>
                  <TextColorTopControl editor={editor} />
                  <HighlightTopControl editor={editor} />
                </>
              )}
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
            </div>)
          
        }}>

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