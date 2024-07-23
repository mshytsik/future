export const getLinkAdditionalData = async (link) => {
  const API_KEY = 'pk_c4a105963f5e3692fac0315c59a286db83804913';

  const response = await fetch(
    `https://jsonlink.io/api/extract?url=${encodeURIComponent(
      link
    )}&api_key=${API_KEY}`
  );

  if (response.ok) {
    const linkData = await response.json();

    return {
      title: linkData.title ?? null,
      subtitle: linkData.description ?? null,
      favicon: linkData.favicon ?? null,
      image: linkData.images?.[0] ?? null,
    };
  }

  return {};
};
