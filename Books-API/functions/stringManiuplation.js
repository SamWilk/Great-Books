const openLibraryBaseSearchUrl = "https://openlibrary.org/search.json?q=";
const pageUrlParam = "&page=";
const limitUrlParam = "&limit=";
const offsetUrlParam = "&offset=";

function appendTitleToUrl(parsedTitle, page, limit, offset) {
  let url = openLibraryBaseSearchUrl.concat(parsedTitle);
  if (page) {
    const pageParam = pageUrlParam.concat(page);
    url = url.concat(pageParam);
  }
  if (limit) {
    const limitParam = limitUrlParam.concat(limit);
    url = url.concat(limitParam);
  }
  if (offset) {
    const offsetParam = offsetUrlParam.concat(offset);
    url = url.concat(offsetParam);
  }
  return url;
}

module.exports = {
  appendTitleToUrl,
};
