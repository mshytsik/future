import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ThemeContext } from '../../../../App';
import { getLinkAdditionalData } from '../../../../services/linkData';
import { errorHandler } from '../../../../utils/utils';

import EditorInput from '../../EditorInput/EditorInput';

import loaderIcon from '../../../../assets/img/icons/loader.svg';
import loaderIconDark from '../../../../assets/img/icons/theme/loader.svg';

import './Link.scss';
import './LinkTheme.scss';

const Link = ({ data, name, setBlocks, className = '', shouldValidate }) => {
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
      [name]: data.href,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    setIsLoading(true);
    const link = formData[name].trim();
    const linkData = await getLinkAdditionalData(link);
    setIsLoading(false);

    setBlocks((blocks) =>
      blocks.map((item) =>
        item.id === data.id
          ? {
              ...item,
              valid: true,
              href: link,
              title: link,
              ...linkData,
            }
          : item
      )
    );
  };

  useEffect(() => {
    !data.href && setFocus(name);
  }, []);

  useEffect(() => {
    if (shouldValidate) {
      clearErrors();
      handleSubmit(onSubmit, (errors) => errorHandler(errors))();
    }
  }, [shouldValidate]);

  const theme = useContext(ThemeContext);

  return (
    <div className={`block-link ${className}`}>
      {data.href ? (
        <RouterLink
          to={data.href}
          target="_blank"
          className="block-link__result link-result"
        >
          <div className="link-result__content">
            {(data.title || data.subtitle) && (
              <div className="link-result__head">
                {data.title && (
                  <p className="link-result__title">{data.title}</p>
                )}
                {data.subtitle && (
                  <p className="link-result__subtitle">{data.subtitle}</p>
                )}
              </div>
            )}

            <div className="link-result__url">
              {data.favicon && <img src={data.favicon} />}
              <p>{data.href}</p>
            </div>
          </div>

          {data.image && (
            <div className="link-result__image">
              <img src={data.image} />
            </div>
          )}
        </RouterLink>
      ) : (
        <>
          {isLoading && (
            <div className="block-link__loader">
              <img src={theme === 'light' ? loaderIcon : loaderIconDark} />
            </div>
          )}

          {!isLoading && (
            <div className="editor-block__form block-link__form">
              <EditorInput
                control={control}
                getValues={getValues}
                setValue={setValue}
                name={name}
                type="url"
                placeholder="Insert link"
                error={
                  errors[name] ||
                  (shouldValidate &&
                    !data.valid && { message: 'Link is not added.' })
                }
                onSubmit={handleSubmit(onSubmit, (errors) =>
                  errorHandler(errors)
                )}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Link;
