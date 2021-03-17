import React, {useState} from 'react'
import {Editor, EditorState, convertFromRaw, CompositeDecorator} from 'draft-js'
import Share from '../properties/Share'

function findImageEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'IMAGE'
        );
      },
      callback
    );
  }

  const Image = (props) => {
    const {
      height,
      src,
      width,
    } = props.contentState.getEntity(props.entityKey).getData();

    return (
      <img src={src} height={height} width={width} />
    );
  };

const decorator = new CompositeDecorator([
    {
      strategy: findImageEntities,
      component: Image
    }
  ]);

const BlogContent = ({content}) => {
    const contentState = convertFromRaw(content);
    const [editorState] = useState(EditorState.createWithContent(contentState, decorator))
    return (<>
       <Editor editorState={editorState} readOnly={true}/>
       <Share />
       </>
    )
}

export default BlogContent
