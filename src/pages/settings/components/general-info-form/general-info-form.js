import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import LazyLoad from 'react-lazyload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { handleUpdateMe } from '../../../../store/auth/thunk';
import { selectAuthUser } from '../../../../store/auth/selectors';
import {
  Image,
  ImageWrapper,
  ButtonDelete,
  ImageButtonsWrapper,
} from './styled-components';
import FormSection from '../form-section/form-section';
import ImageUpload from '../../../../components/image-upload';
import { ControlledInput } from '../../../../components/form-items';
import { getImageUrl } from '../../../../utils/general';
import FormRules from '../../../../utils/form-input-rules';
import { MAX_IMAGE_SIZE } from '../../../../constants/general';

const GeneralInfoForm = () => {
  const dispatch = useDispatch();

  const authUser = useSelector(selectAuthUser);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: authUser.name,
    },
  });

  const [{ image, file }, setImage] = useState({
    image: authUser.avatar,
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const callback = () => setLoading(false);
  const successCallback = (data) => {
    data.avatar && setImage({ file: null, image: data.avatar });
  };

  const handleFormSubmit = handleSubmit(({ name }) => {
    setLoading(true);

    const formData = new FormData();

    formData.append('name', name);

    if (file) {
      formData.append('avatar', file);
    } else if (authUser.avatar && image === '') {
      formData.append('avatar', image);
    }

    dispatch(handleUpdateMe(formData, callback, successCallback));
  });

  const handleImageCrop = useCallback(
    (data) => setImage({ image: data.croppedImageUrl, file: data.file }),
    [],
  );

  const handleImageRemove = () => {
    image && setImage({ file: null, image: '' });
  };

  return (
    <FormSection
      title="Your account settings"
      buttonLabel="Save settings"
      onSubmit={handleFormSubmit}
      loading={loading}
    >
      <ControlledInput
        control={control}
        name="name"
        label="Name"
        disabled={loading}
        rules={FormRules()
          .required('Name is required!')
          .maxLength(50, 'Name must be no more than 50 characters long')}
      />

      <ImageWrapper>
        <LazyLoad>
          <Image src={getImageUrl(image)} alt="User avatar" />
        </LazyLoad>

        <ImageButtonsWrapper>
          <ImageUpload
            onSave={handleImageCrop}
            label="Choose new avatar"
            maxSize={MAX_IMAGE_SIZE.AVATAR}
          />

          <ButtonDelete
            onClick={handleImageRemove}
            disabled={!image || loading}
          >
            <DeleteOutlineIcon />
            Delete
          </ButtonDelete>
        </ImageButtonsWrapper>
      </ImageWrapper>
    </FormSection>
  );
};

export default GeneralInfoForm;
