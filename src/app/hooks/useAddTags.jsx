import { useSelector, useDispatch } from 'react-redux';
import { selectTerms, addTerms } from '../store/reducers/articlesReducer';
import { getNewId, getNewSlug } from '../utils/utils';

const useAddTags = (type) => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTerms(type, 'tags'));

  return (tagNames) => {
    const tagsData = [];

    tagNames.map((tag, index) => {
      const existingTag = tags.find((item) => item.name === tag);

      if (existingTag) {
        tagsData.push({
          id: existingTag.id,
          slug: existingTag.slug,
          exists: true,
        });
      } else {
        const newSlug = getNewSlug(tag, [...tags, ...tagsData]);
        tagsData.push({
          id: getNewId(tags) + tagsData.filter((item) => !item.exists).length,
          slug: newSlug,
          exists: false,
        });

        dispatch(
          addTerms({
            type,
            term: 'tags',
            data: [
              {
                id: tagsData[index].id,
                slug: newSlug,
                name: tag,
              },
            ],
          })
        );
      }
    });

    return tagsData.map((item) => item.id);
  };
};

export default useAddTags;
