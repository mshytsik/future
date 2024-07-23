import Article from '../Article/Article';

const GridBlock = ({ articles, isHomeBlock = false }) => {
  return (
    <div className="row">
      {articles.map((article, index) => {
        let className = `col col-${index < 3 ? 4 : 6} ${
          !index ? '' : 'col-sm-12'
        }`;
        if (isHomeBlock) {
          className += ` col-md-${!index ? 12 : 4} ${
            index > 3 ? 'hide-sm' : ''
          }`;
        } else {
          className += ` col-md-${!index ? 12 : 6}`;
        }

        let types = '';
        if (!index) {
          types = 'large-sm large-xs';
        } else if (index >= 3) {
          types = 'row';
        }

        return (
          <div key={article.id} className={className}>
            <Article types={types} article={article} />
          </div>
        );
      })}
    </div>
  );
};

export default GridBlock;
