import useToast from './useToast';

const useArticleShare = (article) => {
  const toast = useToast();

  return () => {
    navigator.clipboard.writeText(
      `${location.protocol}//${location.hostname}:${location.port}/${article.type}/${article.id}`
    );

    toast({ title: 'Link copied' });
  };
};

export default useArticleShare;
