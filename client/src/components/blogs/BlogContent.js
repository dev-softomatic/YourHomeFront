import React, {useState, useEffect} from 'react'
import {Editor, EditorState, convertFromRaw, CompositeDecorator} from 'draft-js'
import Share from '../properties/Share'
import {connect} from 'react-redux'


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

const BlogContent = ({contentAr, contentEn, lang}) => {
    const [content, setContent] = useState(lang === 'en' ? contentEn : contentAr)
    const contentState = convertFromRaw(content);
    const [editorState] = useState(EditorState.createWithContent(contentState, decorator))
   
    return (<>
       <Editor editorState={editorState} readOnly={true}/>
       <Share />
       </>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    lang: state.language.lang
  }
}


export default connect(mapStateToProps, {})(BlogContent)
