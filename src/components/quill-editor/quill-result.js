import React from 'react';
import { string, bool } from 'prop-types';
import ReactQuill from 'react-quill';

import { removeHTMLTagsFromString } from '../../utils/general';

const QuillResult = ({ value, showNoFormattedText }) => (
  <ReactQuill
    readOnly
    value={showNoFormattedText ? removeHTMLTagsFromString(value) : value}
    modules={{ toolbar: false }}
  />
);

QuillResult.propTypes = {
  value: string.isRequired,
  showNoFormattedText: bool,
};

export default QuillResult;
