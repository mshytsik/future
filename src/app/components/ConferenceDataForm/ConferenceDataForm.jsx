import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectTerms } from '../../store/reducers/articlesReducer';
import { getDate, getTimezone } from '../../utils/dateTime';
import { errorHandler } from '../../utils/utils';
import { useAddTags } from '../../hooks';

import {
  Form,
  FormInput,
  FormSelect,
  FormTags,
  FormTabs,
} from '../../components/form';
import { Toggle } from '../shared';
import PreviewBlock from '../PreviewBlock/PreviewBlock';

import './ConferenceDataForm.scss';

import timezones from '../../data/timezones';

const ConferenceDataForm = ({
  articleData,
  setArticleData,
  setImageValue,
  shouldValidate,
  setValidation,
  onValidCallback = null,
}) => {
  const categories = useSelector(selectTerms('conference', 'categories'));
  const tags = useSelector(selectTerms('conference', 'tags'));

  const initialDateTime = {
    start: getDate(articleData.dateTime.start),
    end: getDate(articleData.dateTime.end),
  };

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    defaultValues: {
      title: articleData.title,
      description: articleData.description,
      minutesToRead: articleData.minutesToRead,
      category: articleData.category ?? categories[0].id,
      tags: articleData.tags
        ? articleData.tags.map(
            (tag) => tags.find((item) => item.id === tag).name
          )
        : [],
      eventStartDate: initialDateTime.start.date,
      eventStartTime: initialDateTime.start.time.slice(
        0,
        initialDateTime.start.time.length - 3
      ),
      eventEndDate: initialDateTime.end.date,
      eventEndTime: initialDateTime.end.time.slice(
        0,
        initialDateTime.end.time.length - 3
      ),
      eventTimezone: getTimezone(articleData.dateTime.start).value,
      format: articleData.details.format,
      address: articleData.details.address,
      conferenceLink: articleData.details.conferenceLink,
      broadcastLink: articleData.details.broadcastLink,
      listeners: articleData.details.listeners,
    },
  });

  const addTags = useAddTags('conference');

  const onSubmit = (data) => {
    setArticleData({
      ...articleData,
      dateTime: {
        start: `${data.eventStartDate}T${data.eventStartTime}:00${data.eventTimezone}`,
        end: `${data.eventEndDate}T${data.eventEndTime}:00${data.eventTimezone}`,
      },
      category: data.category,
      minutesToRead: data.minutesToRead,
      details: {
        ...articleData.details,
        address: data.format === 'online' ? '' : data.address,
        conferenceLink: data.conferenceLink,
        broadcastLink: data.format === 'online' ? data.broadcastLink : '',
        listeners: data.listeners,
      },
      tags: addTags(data.tags),
    });

    setValidation((prev) => ({
      isValid: { ...prev.isValid, dataForm: true },
      shouldValidate: false,
    }));

    onValidCallback?.();
  };

  const onError = (errors) => {
    setValidation((prev) => ({
      isValid: { ...prev.isValid, dataForm: false },
      shouldValidate: false,
    }));

    errorHandler(errors);
  };

  useEffect(() => {
    shouldValidate && handleSubmit(onSubmit, onError)();
  }, [shouldValidate]);

  const [title, description, format, eventStartDate, eventEndDate] = watch([
    'title',
    'description',
    'format',
    'eventStartDate',
    'eventEndDate',
  ]);

  useEffect(() => {
    setArticleData((data) => ({
      ...data,
      title,
      description,
      details: { ...data.details, format },
    }));
  }, [title, description, format]);

  const [repeatDate, setRepeatDate] = useState(false);

  useEffect(() => {
    if (repeatDate) {
      setValue('eventEndDate', getValues('eventStartDate'), {
        shouldValidate: false,
      });
      clearErrors('eventEndDate');
    }
  }, [repeatDate, eventStartDate]);

  useEffect(() => {
    ['eventStartDate', 'eventEndDate'].forEach((field) => {
      setValue(field, getValues(field), { shouldValidate: false });
    });
  }, [eventStartDate, eventEndDate]);

  return (
    <Form submit={handleSubmit(onSubmit, onError)} className="conference-form">
      <p className="form__subtitle">General information</p>

      <PreviewBlock
        value={articleData.image}
        setValue={setImageValue}
        imageName="image"
        isLabel
      />

      <FormInput
        control={control}
        value={title}
        setValue={setValue}
        name="title"
        label="Title"
        type="text"
        placeholder="Title"
        required
        maxLength={100}
        error={errors.title}
      />

      <FormInput
        control={control}
        value={description}
        setValue={setValue}
        name="description"
        label="Short description"
        type="textarea"
        placeholder="Short conference description..."
        required
        maxLength={200}
        error={errors.description}
      />

      <FormSelect
        control={control}
        value={getValues('category')}
        setValue={setValue}
        name="category"
        options={categories.map((item) => ({
          name: item.name,
          value: item.id,
        }))}
        label="Category"
        error={errors.category}
      />

      <FormTabs
        control={control}
        value={format}
        setValue={setValue}
        name="format"
        options={['online', 'offline'].map((item) => ({
          name: `${item[0].toUpperCase()}${item.slice(1)}`,
          value: item,
        }))}
        label="Format"
        error={errors.format}
      />

      <FormInput
        control={control}
        value={getValues('conferenceLink')}
        setValue={setValue}
        name="conferenceLink"
        label="Link"
        type="url"
        placeholder="Insert the conference link..."
        error={errors.conferenceLink}
      />

      {articleData.details.format === 'online' ? (
        <FormInput
          control={control}
          value={getValues('broadcastLink')}
          setValue={setValue}
          name="broadcastLink"
          label="Broadcast link"
          type="url"
          placeholder="Insert the broadcast link..."
          error={errors.broadcastLink}
          key="broadcastLink"
        />
      ) : (
        <FormInput
          control={control}
          value={getValues('address')}
          setValue={setValue}
          name="address"
          label="Location"
          type="text"
          placeholder="City, country"
          error={errors.address}
          key="address"
        />
      )}

      <div className="row">
        <div className="col col-4 col-sm-6">
          <FormInput
            control={control}
            value={eventStartDate}
            setValue={setValue}
            name="eventStartDate"
            label="Start date"
            type="date"
            required
            error={errors.eventStartDate}
          />
        </div>

        <div className="col col-4 col-sm-6">
          <FormInput
            control={control}
            value={getValues('eventStartTime')}
            setValue={setValue}
            name="eventStartTime"
            label="Time"
            type="time"
            required
            error={errors.eventStartTime}
          />
        </div>

        <div className="col col-4 col-sm-12">
          <FormSelect
            control={control}
            value={getValues('eventTimezone')}
            setValue={setValue}
            name="eventTimezone"
            options={timezones.map((zone) => ({
              name: zone.name,
              value: zone.value,
            }))}
            label="Timezone"
            error={errors.eventTimezone}
          />
        </div>
      </div>

      <div className="row">
        <div className="col col-4 col-sm-6">
          <FormInput
            control={control}
            value={getValues('eventEndDate')}
            setValue={setValue}
            name="eventEndDate"
            label="End date"
            type="date"
            required
            error={errors.eventEndDate}
            disabled={repeatDate}
            validate={{
              lessStartDate: (value) =>
                Date.parse(value) < Date.parse(getValues('eventStartDate'))
                  ? 'The end date must be later than the start date.'
                  : true,
            }}
          />
        </div>

        <div className="col col-4 col-sm-6">
          <FormInput
            control={control}
            value={getValues('eventEndTime')}
            setValue={setValue}
            name="eventEndTime"
            label="Time"
            type="time"
            required
            error={errors.eventEndTime}
            validate={{
              lessStartTime: (value) =>
                getValues('eventStartDate') === getValues('eventEndDate') &&
                value < getValues('eventStartTime')
                  ? 'The end time must be later than the start time.'
                  : true,
            }}
          />
        </div>

        <div className="col col-4 col-sm-12">
          <div className="conference-form__repeater">
            <Toggle
              name="Same as start date"
              value={repeatDate}
              callback={() => setRepeatDate((repeat) => !repeat)}
              labelFirst={false}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col col-6">
          <FormInput
            control={control}
            value={getValues('minutesToRead')}
            setValue={setValue}
            name="minutesToRead"
            label="Reading time (minutes)"
            type="number"
            placeholder="5"
            max={60}
            min={1}
            error={errors.minutesToRead}
          />
        </div>

        <div className="col col-6">
          <FormInput
            control={control}
            value={getValues('listeners')}
            setValue={setValue}
            name="listeners"
            label="Number of listeners"
            type="number"
            placeholder="1000"
            max={100000}
            min={1}
            error={errors.listeners}
          />
        </div>
      </div>

      <FormTags
        value={getValues('tags')}
        setValue={setValue}
        name="tags"
        label="Tags"
        max={10}
        required
        error={errors.tags}
        note="Add or change tags to let readers know what your event is about"
      />
    </Form>
  );
};

export default ConferenceDataForm;
