import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { errorHandler } from '../../../../utils/utils';

import EditorInput from '../../EditorInput/EditorInput';

import './Video.scss';
import './VideoTheme.scss';

const Video = ({ data, name, setBlocks, className = '', shouldValidate }) => {
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    defaultValues: {
      [name]: data.value,
    },
  });

  const onSubmit = (formData) => {
    const link = formData[name].trim();
    const isYoutube = /^https:\/\/www\.youtube\.com\/watch\?v=/.test(link);
    const isVimeo = /^https:\/\/vimeo.com\//.test(link);

    let videoSrc = '';
    if (isYoutube) {
      videoSrc = `https://www.youtube.com/embed/${
        link.split('youtube.com/watch?v=')[1]
      }`;
    } else if (isVimeo) {
      videoSrc = `https://player.vimeo.com/video/${
        link.split('vimeo.com/')[1]
      }`;
    }

    setBlocks((blocks) =>
      blocks.map((item) =>
        item.id === data.id ? { ...item, valid: true, value: videoSrc } : item
      )
    );
  };

  const validateVideoLink = (value) => {
    const isYoutube = /^https:\/\/www\.youtube\.com\/watch\?v=/.test(value);
    const isVimeo = /^https:\/\/vimeo.com\//.test(value);
    return isYoutube || isVimeo
      ? true
      : 'The entered resource is not supported.';
  };

  useEffect(() => {
    !data.value && setFocus(name);
  }, []);

  useEffect(() => {
    if (shouldValidate) {
      clearErrors();
      handleSubmit(onSubmit, (errors) => errorHandler(errors))();
    }
  }, [shouldValidate]);

  return (
    <div className={`block-video ${className}`}>
      {!data.value && (
        <div className="editor-block__form block-video__form">
          <EditorInput
            control={control}
            getValues={getValues}
            setValue={setValue}
            name={name}
            type="text"
            placeholder="Insert YouTube or Vimeo link..."
            validate={{ [name]: validateVideoLink }}
            error={
              errors[name] ||
              (shouldValidate &&
                !data.valid && { message: 'Link is not added.' })
            }
            onSubmit={handleSubmit(onSubmit, (errors) => errorHandler(errors))}
          />
        </div>
      )}

      {data.value && (
        <div className="block-video__result">
          <iframe
            src={data.value}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Video;
