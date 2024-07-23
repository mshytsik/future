import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { Tabs } from '../../shared';

import '../../shared/Tabs/Tabs.scss';
import '../../shared/Tabs/TabsTheme.scss';
import '../FormInput/FormInput.scss';
import './FormTabs.scss';

const FormTabs = ({
  control,
  value,
  setValue,
  name,
  options,
  label = '',
  labelBlock = true,
  error = null,
}) => {
  const [tabsValue, setTabsValue] = useState(value);

  useEffect(() => {
    setValue(name, tabsValue, { shouldValidate: false });
  }, [tabsValue]);

  const inputContent = (
    <div className="form__input form-input form-input--tabs">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input {...field} type="text" value={tabsValue} hidden />
        )}
      />

      <Tabs tabs={options} activeTab={tabsValue} setActive={setTabsValue} />

      {error && <label className="form__error is-error">{error.message}</label>}
    </div>
  );

  return labelBlock ? (
    <div className="form__block">
      {label && (
        <div className="form__block-head">
          <label className="form__label">{label}</label>
        </div>
      )}

      {inputContent}
    </div>
  ) : (
    inputContent
  );
};

export default FormTabs;
