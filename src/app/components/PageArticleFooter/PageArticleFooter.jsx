import { useSelector } from 'react-redux';
import { selectTerms } from '../../store/reducers/articlesReducer';
import { Link } from 'react-router-dom';

import PageArticleNav from '../PageArticleNav/PageArticleNav';
import SpeakersList from '../SpeakersList/SpeakersList';
import { Tag } from '../shared';

import './PageArticleFooter.scss';
import './PageArticleFooterTheme.scss';

const PageArticleFooter = ({ article }) => {
  const tags = useSelector(selectTerms(article.type, 'tags'));

  return (
    <div className="page-article__footer pa-footer">
      {article.type === 'conference' && (
        <SpeakersList
          speakers={article.speakers.filter(
            (speaker) => speaker.status === 'organizer'
          )}
          title="Organizers"
          showTopics
          className="pa-footer__speakers"
        />
      )}

      <div className="pa-footer__prenav">
        <div className="pa-footer__tags">
          {article.tags.map((tagId) => (
            <Tag
              key={tagId}
              tag={{
                type: article.type,
                ...tags.find((tag) => tag.id === tagId),
                color: '',
              }}
            />
          ))}
        </div>

        {article.type === 'conference' &&
          (article.details.conferenceLink || article.details.broadcastLink) && (
            <div className="pa-footer__links">
              {article.details.conferenceLink && (
                <Link to={article.details.conferenceLink} target="_blank">
                  Event website
                </Link>
              )}

              {article.details.broadcastLink && (
                <Link to={article.details.broadcastLink} target="_blank">
                  On-line translation
                </Link>
              )}
            </div>
          )}
      </div>

      <PageArticleNav article={article} className="pa-footer__nav" />
    </div>
  );
};

export default PageArticleFooter;
