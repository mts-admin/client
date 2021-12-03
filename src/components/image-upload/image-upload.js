import React, { useState, useCallback, useRef } from 'react';
import { bool, func, node, number, oneOfType, string } from 'prop-types';
import { toast } from 'react-toastify';
import ReactCrop from 'react-image-crop';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

import {
  InputFileWrapper,
  InputFile,
  InputFileLabel,
  CropWrapper,
  Buttons,
} from './styled-component';
import SimpleModal from '../simple-modal';
import { TextButton } from '../buttons';

import 'react-image-crop/dist/ReactCrop.css';

const getDefaultState = (aspect) => ({
  src: null,
  crop: {
    unit: '%',
    width: 50,
    ...(aspect && { aspect }),
  },
});

const ImageUpload = ({ onSave, label, maxSize, aspect }) => {
  const [state, setState] = useState(() => getDefaultState(aspect));

  const imageRef = useRef(null);

  const handleStateUpdate = useCallback(
    (value) => setState((prevState) => ({ ...prevState, ...value })),
    [],
  );

  const handleFileSelect = useCallback(
    (e) => {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      const size = parseFloat(e.target.files[0].size / (1024 * 1024));

      if (size > maxSize) {
        toast.error(`Max file size is ${maxSize} MB`);
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', () =>
        handleStateUpdate({ src: reader.result }),
      );
      reader.readAsDataURL(e.target.files[0]);
    },
    [handleStateUpdate, maxSize],
  );

  const onImageLoaded = useCallback(
    (image) => {
      imageRef.current = image;
      handleStateUpdate({
        crop: { width: image.width / 2, height: image.height / 2 },
      });
    },
    [handleStateUpdate],
  );

  const onCropChange = useCallback(
    (crop) => {
      if (crop.width && crop.height) {
        handleStateUpdate({ crop });
      }
    },
    [handleStateUpdate],
  );

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve({
            croppedImageUrl: window.URL.createObjectURL(blob),
            file: new File([blob], 'new-image.jpeg', { type: 'image/jpeg' }),
          });
        },
        'image/jpeg',
        1,
      );
    });
  };

  const makeClientCrop = useCallback(
    async (crop) => {
      if (imageRef.current && crop.width && crop.height) {
        const { file, croppedImageUrl } = await getCroppedImg(
          imageRef.current,
          crop,
        );

        onSave({ file, croppedImageUrl });

        imageRef.current = null;
        setState(() => getDefaultState(aspect));
      }
    },
    [aspect, onSave],
  );

  const onCropComplete = useCallback(() => {
    makeClientCrop(state.crop);
  }, [state.crop, makeClientCrop]);

  const onCropCancel = useCallback(() => {
    imageRef.current = null;
    setState(() => getDefaultState(aspect));
  }, [aspect]);

  const { crop, src } = state;

  const open = Boolean(src);

  return (
    <>
      <InputFileWrapper>
        <InputFile
          type="file"
          accept="image/*"
          id="file-upload"
          onChange={handleFileSelect}
          onClick={(event) => {
            event.target.value = null;
          }}
        />
        <InputFileLabel htmlFor="file-upload">
          <DownloadIcon />
          {label}
        </InputFileLabel>
      </InputFileWrapper>
      <SimpleModal open={open} onClose={onCropCancel}>
        <CropWrapper>
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            keepSelection
            onImageLoaded={onImageLoaded}
            onChange={onCropChange}
          />
          <Buttons>
            <TextButton onClick={onCropCancel}>Cancel</TextButton>
            <Button variant="contained" onClick={onCropComplete}>
              Save
            </Button>
          </Buttons>
        </CropWrapper>
      </SimpleModal>
    </>
  );
};

ImageUpload.defaultProps = {
  label: 'Choose file',
  maxSize: 1,
  aspect: 1 / 1,
};

ImageUpload.propTypes = {
  onSave: func.isRequired,
  label: oneOfType([string, node]),
  maxSize: number,
  aspect: oneOfType([number, bool]),
};

export default React.memo(ImageUpload);
