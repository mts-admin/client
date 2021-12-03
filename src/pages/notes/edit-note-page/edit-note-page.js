import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import * as R from 'ramda';

import useEditNotePageContainer from './container';
import {
  Content,
  Title,
  Form,
  Buttons,
  DeleteButton,
} from './styled-components';
import {
  ControlledInput,
  ControlledTagsInput,
} from '../../../components/form-items';
import SimpleMessage from '../../../components/simple-message';
import { QuillEditor } from '../../../components/quill-editor';
import { ButtonPrimary, TextButton } from '../../../components/buttons';
import FormRules from '../../../utils/form-input-rules';
import { removeHTMLTagsFromString } from '../../../utils/general';
import { COMPONENT_STATE } from '../../../constants/general';

const EditNotePage = () => {
  const {
    control,
    loading,
    errorMessage,
    componentState,
    handleFormSubmit,
    handleCancelButtonClick,
    handleDeleteButtonClick,
  } = useEditNotePageContainer();

  return (
    <Content>
      {R.cond([
        [R.equals(COMPONENT_STATE.LOADING), () => <CircularProgress />],
        [
          R.equals(COMPONENT_STATE.ERROR),
          () => <SimpleMessage title={errorMessage} error />,
        ],
        [
          R.equals(COMPONENT_STATE.SUCCESS),
          () => (
            <>
              <Title>Edit note</Title>

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
                <DeleteButton
                  color="error"
                  variant="contained"
                  onClick={handleDeleteButtonClick}
                >
                  Delete
                </DeleteButton>
                <TextButton
                  onClick={handleCancelButtonClick}
                  disabled={loading}
                >
                  Cancel
                </TextButton>
                <ButtonPrimary onClick={handleFormSubmit} loading={loading}>
                  Save
                </ButtonPrimary>
              </Buttons>
            </>
          ),
        ],
      ])(componentState)}
    </Content>
  );
};

export default EditNotePage;
