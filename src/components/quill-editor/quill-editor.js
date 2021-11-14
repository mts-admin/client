import React from 'react';
import { string, func } from 'prop-types';
import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    ['code'],
    ['link'],
    ['clean'],
  ],
};

const formats = [
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'background',
  'color',
  'code',
  'align',
  'script',
];

const QuillEditor = ({ value, onChange }) => (
  <ReactQuill
    theme="snow"
    value={value}
    onChange={onChange}
    modules={modules}
    formats={formats}
  />
);

QuillEditor.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
};

export default QuillEditor;
