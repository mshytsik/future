import './ArticleEditorFooter.scss';
import './ArticleEditorFooterTheme.scss';

const ArticleEditorFooter = ({ backButton = null, forwardButton = null }) => {
  return (
    <div className="editor-footer row row-16">
      <div className="col col-4 col-xl-2 col-lg-0"></div>

      <div className="editor-footer__content col col-8 col-lg-12">
        {backButton}

        {forwardButton}
      </div>

      <div className="col col-4 col-xl-2 col-lg-0"></div>
    </div>
  );
};

export default ArticleEditorFooter;
