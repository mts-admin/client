import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import LazyLoad from 'react-lazyload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { handleBonusEdit, handleBonusGet } from '../../../store/bonuses/thunk';
import {
  selectBonusCurrentItem,
  selectBonusesError,
  selectBonusesLoading,
} from '../../../store/bonuses/selectors';
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
  ErrorMessage,
  ImageButtonsWrapper,
} from './styled-components';
import { ControlledInput } from '../../../components/form-items';
import { ButtonPrimary } from '../../../components/buttons';
import ImageUpload from '../../../components/image-upload';
import FormRules from '../../../utils/form-input-rules';
import useEffectAfterMount from '../../../hooks/use-effect-after-mount';
import { getErrorMessage, getImageUrl } from '../../../utils/general';
import { MAX_IMAGE_SIZE } from '../../../constants/general';

const EditBonusModal = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm();

  const [{ image, file }, setImage] = useState({
    image: '',
    file: null,
  });

  const { id } = useSelector(selectModalPayload);
  const bonus = useSelector(selectBonusCurrentItem);
  const loading = useSelector(selectBonusesLoading);
  const error = useSelector(selectBonusesError);

  useEffect(() => {
    dispatch(handleBonusGet(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectAfterMount(() => {
    reset({
      title: bonus.title,
      description: bonus.description,
    });
    bonus.image && setImage({ file: null, image: bonus.image });
  }, [bonus]);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([name, value]) => {
      formData.append(name, value);
    });

    if (file) {
      formData.append('image', file);
    } else if (bonus.image && image === '') {
      formData.append('image', image);
    }

    dispatch(
      handleBonusEdit({
        id,
        body: formData,
        callback: closeModal,
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

  return error ? (
    <ErrorMessage severity="error">{getErrorMessage(error)}</ErrorMessage>
  ) : (
    <Content>
      <Title>Edit bonus</Title>

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

        <Buttons>
          <CancelButton onClick={closeModal} disabled={loading}>
            Cancel
          </CancelButton>
          <ButtonPrimary loading={loading} type="submit">
            Edit
          </ButtonPrimary>
        </Buttons>
      </Form>
    </Content>
  );
};

export default EditBonusModal;
