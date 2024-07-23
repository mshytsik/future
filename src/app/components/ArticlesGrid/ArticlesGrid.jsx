import { Fragment, useState, useEffect, useRef } from 'react';

import Article from '../Article/Article';
import Conference from '../Conference/Conference';
import Adbanner from '../Adbanner/Adbanner';

import { Button, Tabs, Select } from '../shared';

import wideAdBanner from '../../assets/img/images/adbanner-1.jpg';

import './ArticlesGrid.scss';
import GridBlock from '../GridBlock/GridBlock';

const ArticlesGrid = ({
  articles,
  head = null,
  isBlocks = false,
  filterValue = null,
  defaultPerPage = 10,
  pagination = true,
  defaultPage = 1,
}) => {
  const [activePage, setActivePage] = useState(defaultPage);
  const [batchLoads, setBatchLoads] = useState(0);

  const BLOCK_PER_PAGE = 15;
  const GRID_BLOCK_SIZE = 5;
  const perPage = isBlocks ? BLOCK_PER_PAGE : defaultPerPage;

  const pagesCount = Math.ceil(articles.length / perPage);

  const paginationItems = [...Array(pagesCount).keys()]
    .map((item) => item + 1)
    .map((item) => ({
      name: item,
      value: item,
    }));

  const articlesList = articles.slice(
    perPage * (activePage - 1),
    perPage * (activePage + batchLoads)
  );

  const gridRef = useRef(null);

  useEffect(() => {
    setActivePage(1);
    setBatchLoads(0);
  }, [articles.length, filterValue]);

  const handleChangePage = () => {
    gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setBatchLoads(0);
  };

  return (
    <div className="articles-grid" ref={gridRef}>
      {head && (
        <div className="articles-grid__head grid-head">
          {head.tabs && (
            <Tabs
              tabs={head.tabs.options}
              activeTab={head.tabs.activeTab}
              setActive={head.tabs.setActiveTab}
            />
          )}

          {head.filter && (
            <Select
              options={head.filter.options}
              value={head.filter.value}
              setOptionValue={head.filter.setValue}
              className="grid-head__filter select--left-xs"
            />
          )}
        </div>
      )}

      <div className="articles-grid__body">
        {isBlocks
          ? new Array(batchLoads + 1).fill().map((_, index) =>
              new Array(BLOCK_PER_PAGE / GRID_BLOCK_SIZE).fill().map((_, i) => {
                const articlesInBlock = articlesList.slice(
                  perPage * index + i * GRID_BLOCK_SIZE,
                  perPage * index + (i + 1) * GRID_BLOCK_SIZE
                );

                return (
                  articlesList.length > 0 && (
                    <Fragment key={perPage * index + i}>
                      <GridBlock articles={articlesInBlock} />

                      {index === 0 &&
                        i !== 2 &&
                        articlesList.length > (i + 1) * GRID_BLOCK_SIZE && (
                          <Adbanner link="#" imageSrc={wideAdBanner} />
                        )}
                    </Fragment>
                  )
                );
              })
            )
          : articlesList.map((article) =>
              article.type === 'post' ? (
                <Article key={article.id} types="fw" article={article} />
              ) : (
                <Conference key={article.id} article={article} />
              )
            )}
      </div>

      {pagesCount > 1 && (
        <div className="articles-grid__nav">
          {pagination && (
            <div className="articles-grid__pagination pagination">
              <Tabs
                tabs={paginationItems}
                activeTab={activePage}
                setActive={setActivePage}
                callback={handleChangePage}
              />
            </div>
          )}

          {perPage * (activePage + batchLoads) < articles.length && (
            <Button
              callback={() => setBatchLoads((loads) => loads + 1)}
              title="Load more"
              type="primary"
              className="articles-grid__load"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ArticlesGrid;
