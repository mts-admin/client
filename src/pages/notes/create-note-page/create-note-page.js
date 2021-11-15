import React from 'react';

import useCreateNotePageContainer from './container';
import { Content, Title, Form, Buttons } from './styled-components';
import {
  ControlledInput,
  ControlledTagsInput,
} from '../../../components/form-items';
import { QuillEditor } from '../../../components/quill-editor';
import { ButtonPrimary, TextButton } from '../../../components/buttons';
import FormRules from '../../../utils/form-input-rules';
import { removeHTMLTagsFromString } from '../../../utils/general';

const CreateNotePage = () => {
  const { control, loading, handleFormSubmit, handleCancelButtonClick } =
    useCreateNotePageContainer();

  return (
    <Content>
      <Title>Create note</Title>

      <Form>
        <ControlledInput
          control={control}
          name="title"
          label="Title"
          rules={FormRules().required('Please enter a title')}
        />

        <QuillEditor
          control={control}
          name="content"
          rules={FormRules().validate(
            (value) => removeHTMLTagsFromString(value).length > 0,
            'Please enter a content',
          )}
        />

        <ControlledTagsInput
          control={control}
          name="tags"
          label="Tags"
          placeholder="Type some text and press 'Enter' to create a tag"
          rules={FormRules().validate(
            (value) => value.filter(Boolean).length <= 5,
            'You can only pick no more than 5 tags',
          )}
        />
      </Form>

      <Buttons>
        <TextButton onClick={handleCancelButtonClick} disabled={loading}>
          Cancel
        </TextButton>
        <ButtonPrimary onClick={handleFormSubmit} loading={loading}>
          Save
        </ButtonPrimary>
      </Buttons>
    </Content>
  );
};

export default CreateNotePage;
