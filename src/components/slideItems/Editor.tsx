
/**
 * Rich Text Editor - Toolbar Config Sample
 */
import { HtmlEditor, Inject, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
const Editor = ({ rowHeight }: { rowHeight: number }) => {
  const toolbarSettings = {
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
      'Outdent', 'Indent', '|',
      'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
      'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
  };
  return (<RichTextEditorComponent height={200} width={600} toolbarSettings={toolbarSettings} >

    <Inject services={[Toolbar, HtmlEditor]} />
  </RichTextEditorComponent>);
}

export default Editor;