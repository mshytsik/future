import './PageArticleContents.scss';
import './PageArticleContentsTheme.scss';

const PageArticleContents = ({ items, className = '' }) => {
  const handleClick = (target) => {
    document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`pa-contents ${className}`}>
      <p className="pa-contents__title">Table of contents:</p>

      <div className="pa-contents__list">
        {items.map((item) => (
          <div
            key={item.target}
            onClick={() => handleClick(item.target)}
            className="is-link"
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageArticleContents;
