# HTML To DraftJS

A library for converting plain HTML to DraftJS Editor content.
Build for use with **[react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)**.

## Installation

```
npm install html-to-draftjs --save
```

## Usage

```
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const blocksFromHtml = htmlToDraft(this.props.content);
const { contentBlocks, entityMap } = blocksFromHtml;
const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
const editorState = EditorState.createWithContent(contentState);
```

### (optional) customChunkRenderer
Use to define additional html nodes. Only supports atomic blocks.

* _nodeName: string_ - the name of the node, in lowercase
* _node: HTMLElement_ - the parsed node itself

This renderer function is executed before any other html to draft conversion.
Return nothing (or something falsy) to continue with the normal translation.

Example:

```
htmlToDraft('<hr/>', (nodeName, node) => {
  if (nodeName === 'hr') {
    return {
      type: 'HORIZONTAL_RULE',
      mutability: 'MUTABLE',
      data: {}
    };
  }
})
```


**Take Care:** Plz not use version `1.2.0` it has build issues.
