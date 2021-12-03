import React, { useCallback, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import LazyLoad from 'react-lazyload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import * as R from 'ramda';

import { handleBonusCreate } from '../../../store/bonuses/thunk';
import { selectBonusesLoading } from '../../../store/bonuses/selectors';
import { makeSelectUsers } from '../../../store/users/selectors';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import {
  Form,
  Title,
  Image,
  Content,
  Buttons,
  ImageWrapper,
  ButtonDelete,
  CancelButton,
  ImageButtonsWrapper,
} from './styled-components';
import {
  ControlledInput,
  ControlledAutocomplete,
} from '../../../components/form-items';
import { ButtonPrimary } from '../../../components/buttons';
import ImageUpload from '../../../components/image-upload';
import FormRules from '../../../utils/form-input-rules';
import { getImageUrl } from '../../../utils/general';
import { MAX_IMAGE_SIZE } from '../../../constants/general';

const CreateBonusModal = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm();

  const [{ image, file }, setImage] = useState({
    image: '',
    file: null,
  });

  const selectUsers = useMemo(makeSelectUsers, []);

  const { callback, cancelToken } = useSelector(selectModalPayload);
  const users = useSelector(selectUsers);
  const loading = useSelector(selectBonusesLoading);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();

    const body = {
      ...values,
      userId: values.userId?.id,
    };
    const cb = (userId) => {
      R.is(Function, callback) && callback(userId);
      closeModal();
    };

    Object.entries(body).forEach(([name, value]) => {
      formData.append(name, value);
    });

    if (file) {
      formData.append('image', file);
    }

    dispatch(
      handleBonusCreate({
        body: formData,
        userId: values.userId,
        callback: cb,
        cancelToken,
      }),
    );
  });

  const handleImageCrop = useCallback(
    (data) => setImage({ image: data.croppedImageUrl, file: data.file }),
    [],
  );
  const handleImageRemove = () => {
    image && setImage({ file: null, image: '' });
  };

  const usersList = useMemo(
    () => users.map((user) => ({ id: user._id, label: user.name })),
    [users],
  );

  return (
    <Content>
      <Title>Create bonus</Title>

      <Form onSubmit={onSubmit}>
        <ImageWrapper>
          <LazyLoad>
            <Image src={getImageUrl(image, 'bonus')} alt="Bonus image" />
          </LazyLoad>

          <ImageButtonsWrapper>
            <ImageUpload
              onSave={handleImageCrop}
              label="Choose bonus image"
              maxSize={MAX_IMAGE_SIZE.BONUS}
              aspect={false}
            />

            <ButtonDelete
              onClick={handleImageRemove}
              disabled={!image || loading}
            >
              <DeleteOutlineIcon />
              Remove
            </ButtonDelete>
          </ImageButtonsWrapper>
        </ImageWrapper>

        <ControlledInput
          name="title"
          label="Title"
          control={control}
          rules={FormRules().required('Please enter a title')}
        />

        <ControlledInput
          control={control}
          name="description"
          label="Description"
          multiline
          minRows={3}
          maxRows={10}
          rules={FormRules().required('Please enter a description')}
        />

        <ControlledAutocomplete
          data={usersList}
          control={control}
          name="userId"
          label="User"
          rules={FormRules().required('Please select a user')}
          disablePortal={false}
        />

        <Buttons>
          <CancelButton onClick={closeModal} disabled={loading}>
            Cancel
          </CancelButton>
          <ButtonPrimary loading={loading} type="submit">
            Create
          </ButtonPrimary>
        </Buttons>
      </Form>
    </Content>
  );
};

export default CreateBonusModal;
