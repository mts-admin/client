import React from 'react';
import { string } from 'prop-types';
import ReactQuill from 'react-quill';

const QuillResult = ({ value, ...rest }) => (
  <ReactQuill readOnly value={value} modules={{ toolbar: false }} />
);

QuillResult.defaultProps = {
  value: '',
};

QuillResult.propTypes = {
  value: string,
};

export default QuillResult;
