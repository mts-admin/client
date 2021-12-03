import React from 'react';
import { string, object } from 'prop-types';
import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import FormHelperText from '@mui/material/FormHelperText';
import * as R from 'ramda';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
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
  'align',
  'script',
];

const QuillEditor = ({ name, rules, control, defaultValue }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue={defaultValue}
    render={({ field, fieldState }) => (
      <>
        <ReactQuill
          {...field}
          theme="snow"
          modules={modules}
          formats={formats}
          className={
            R.hasPath(['error', 'message'], fieldState) ? 'has-error' : ''
          }
        />
        {R.hasPath(['error', 'message'], fieldState) && (
          <FormHelperText error style={{ marginLeft: 14 }}>
            {R.path(['error', 'message'], fieldState)}
          </FormHelperText>
        )}
      </>
    )}
  />
);

QuillEditor.defaultProps = {
  rules: {},
  defaultValue: '',
};

QuillEditor.propTypes = {
  control: object.isRequired,
  name: string.isRequired,
  rules: object,
  defaultValue: string,
};

export default QuillEditor;
