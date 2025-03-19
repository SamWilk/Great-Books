const openLibraryBaseSearchUrl = "https://openlibrary.org/search.json?q=";
const pageUrlParam = "&page=";
const limitUrlParam = "&limit=";

function appendTitleToUrl(parsedTitle, page, limit) {
  let url = openLibraryBaseSearchUrl.concat(parsedTitle);
  if (page) {
    const pageParam = pageUrlParam.concat(page);
    url = url.concat(pageParam);
  }
  if (limit) {
    const limitParam = limitUrlParam.concat(limit);
    url = url.concat(limitParam);
  }
  return url;
}

module.exports = {
  appendTitleToUrl,
};
