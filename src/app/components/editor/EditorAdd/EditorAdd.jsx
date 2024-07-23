import { useState, useContext } from 'react';
import { ThemeContext } from '../../../App';
import { getNewId } from '../../../utils/utils';

import { Button, Dropdown } from '../../shared';

import plusIcon from '../../../assets/img/icons/plus.svg';
import plusIconDark from '../../../assets/img/icons/theme/plus.svg';
import editorTextIcon from '../../../assets/img/icons/editor-text.svg';
import editorTextIconDark from '../../../assets/img/icons/theme/editor-text.svg';
import editorH2Icon from '../../../assets/img/icons/editor-h2.svg';
import editorH2IconDark from '../../../assets/img/icons/theme/editor-h2.svg';
import editorH3Icon from '../../../assets/img/icons/editor-h3.svg';
import editorH3IconDark from '../../../assets/img/icons/theme/editor-h3.svg';
import editorH4Icon from '../../../assets/img/icons/editor-h4.svg';
import editorH4IconDark from '../../../assets/img/icons/theme/editor-h4.svg';
import editorUlIcon from '../../../assets/img/icons/editor-ul.svg';
import editorUlIconDark from '../../../assets/img/icons/theme/editor-ul.svg';
import editorOlIcon from '../../../assets/img/icons/editor-ol.svg';
import editorOlIconDark from '../../../assets/img/icons/theme/editor-ol.svg';
import editorQuoteIcon from '../../../assets/img/icons/editor-quote.svg';
import editorQuoteIconDark from '../../../assets/img/icons/theme/editor-quote.svg';
import editorCodeIcon from '../../../assets/img/icons/editor-code.svg';
import editorCodeIconDark from '../../../assets/img/icons/theme/editor-code.svg';
import editorLinkIcon from '../../../assets/img/icons/editor-link.svg';
import editorLinkIconDark from '../../../assets/img/icons/theme/editor-link.svg';
import editorImageIcon from '../../../assets/img/icons/editor-image.svg';
import editorImageIconDark from '../../../assets/img/icons/theme/editor-image.svg';
import editorVideoIcon from '../../../assets/img/icons/editor-video.svg';
import editorVideoIconDark from '../../../assets/img/icons/theme/editor-video.svg';

import './EditorAdd.scss';
import './EditorAddTheme.scss';

const EditorAdd = ({ blocks, setBlocks }) => {
  const theme = useContext(ThemeContext);

  const [showItems, setShowItems] = useState(false);

  const items = [
    {
      name: 'Text',
      icon: theme === 'light' ? editorTextIcon : editorTextIconDark,
      callback: () =>
        setBlocks((items) => [
          ...items,
          { id: getNewId(blocks), valid: true, type: 'text', value: '' },
        ]),
    },
    {
      name: 'Heading 1',
      icon: theme === 'light' ? editorH2Icon : editorH2IconDark,
      callback: () =>
        setBlocks((items) => [
          ...items,
          {
            id: getNewId(blocks),
            valid: false,
            type: 'heading',
            size: 'h2',
            value: '',
          },
        ]),
    },
    {
      name: 'Heading 2',
      icon: theme === 'light' ? editorH3Icon : editorH3IconDark,
      callback: () =>
        setBlocks((items) => [
          ...items,
          {
            id: getNewId(blocks),
            valid: false,
            type: 'heading',
            size: 'h3',
            value: '',
          },
        ]),
    },
    {
      name: 'Heading 3',
      icon: theme === 'light' ? editorH4Icon : editorH4IconDark,
      callback: () =>
        setBlocks((items) => [
          ...items,
          {
            id: getNewId(blocks),
            valid: false,
            type: 'heading',
            size: 'h4',
            value: '',
          },
        ]),
    },
    {
      name: 'List',
      icon: theme === 'light' ? editorUlIcon : editorUlIconDark,
      callback: () =>
        setBlocks((items) => [
          ...items,
          {
            id: getNewId(blocks),
            valid: false,
            type: 'list',
            ordered: false,
            items: [''],
          },
        ]),
    },
    {
      name: 'Ordered list',
      icon: theme === 'light' ? editorOlIcon : editorOlIconDark,
      callback: () =>
        setBlocks((items) => [
          ...items,
          {
            id: getNewId(blocks),
            valid: false,
            type: 'list',
            ordered: true,
            items: [''],
          },
        ]),
    },
    {
      name: 'Quote',
      icon: theme === 'light' ? editorQuoteIcon : editorQuoteIconDark,
      callback: () =>
        setBlocks((items) => [
          ...items,
          { id: getNewId(blocks), valid: false, type: 'quote', value: '' },
        ]),
    },
    {
      name: 'Code',
      icon: theme === 'light' ? editorCodeIcon : editorCodeIconDark,
      callback: () =>
        setBlocks((items) => [
          ...items,
          { id: getNewId(blocks), valid: false, type: 'code', value: '' },
        ]),
    },
    {
      name: 'Link',
      icon: theme === 'light' ? editorLinkIcon : editorLinkIconDark,
      callback: () =>
        setBlocks((items) => [
          ...items,
          {
            id: getNewId(blocks),
            valid: false,
            type: 'link',
            href: '',
            title: '',
            subtitle: '',
            favicon: '',
            image: '',
          },
        ]),
    },
    {
      name: 'Image',
      icon: theme === 'light' ? editorImageIcon : editorImageIconDark,
      callback: () =>
        setBlocks((items) => [
          ...items,
          {
            id: getNewId(blocks),
            valid: false,
            type: 'image',
            image: '',
            label: '',
          },
        ]),
    },
    {
      name: 'Video',
      icon: theme === 'light' ? editorVideoIcon : editorVideoIconDark,
      callback: () =>
        setBlocks((items) => [
          ...items,
          { id: getNewId(blocks), valid: false, type: 'video', value: '' },
        ]),
    },
  ];

  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      navigator.userAgent.toLowerCase()
    );

  return (
    <div className="editor-add">
      <div className="editor-add__button">
        <div className="editor-add__nav">
          <Button
            callback={() => setShowItems((show) => !show)}
            icon={{
              iconSrc: theme === 'light' ? plusIcon : plusIconDark,
              iconOnly: true,
              iconSize: 'xs',
            }}
          />
        </div>
        <p
          onClick={() => setShowItems((show) => !show)}
          className={`editor-add__input ${showItems ? 'is-active' : ''}`}
        >
          Click to enter command
        </p>
      </div>

      <Dropdown
        items={items}
        isActive={showItems}
        setIsActive={setShowItems}
        togglerSelector=".editor-add__button"
        className={`editor-add__dropdown ${isMobile ? 'is-mobile' : ''}`}
      />
    </div>
  );
};

export default EditorAdd;
