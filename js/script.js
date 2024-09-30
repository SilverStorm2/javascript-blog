'use strict'; //pokazuje błędy, np literówka w słowie counter

/** Szablon Handlebars
 *
Handlebars jest biblioteką szablonów JavaScript,
która umożliwia dynamiczne generowanie kodu HTML.
Obiekt templates przechowuje skompilowane szablony, takie jak articleLink,
tagLinkArticle, authorLinkArticle, tagCloudLink, i authorLinkListArticle.
Każdy z tych szablonów jest przypisany do odpowiedniego fragmentu HTML,
zdefiniowanego w kodzie strony, a następnie używany do generowania dynamicznej zawartości
(np. linków artykułów, chmury tagów czy listy autorów) na podstawie danych dostarczonych w aplikacji.
 */
const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  tagLinkArticle: Handlebars.compile(
    document.querySelector('#template-tag-link-article').innerHTML
  ),
  authorLinkArticle: Handlebars.compile(
    document.querySelector('#template-author-article').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-tag-cloud-link').innerHTML
  ),
  authorLinkListArticle: Handlebars.compile(
    document.querySelector('#template-author-list-article').innerHTML
  ),
};

// Selector options
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';
console.log(optAuthorsListSelector);

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    console.log(activeArticle);
  }

  /* get 'href' attribute from the clicked link */
  const getHref = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const correctArticle = document.querySelector(getHref);

  /* add class 'active' to the correct article */
  correctArticle.classList.add('active');
};

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  function clearElement() {
    titleList.innerHTML = '';
  }
  clearElement();

  /* create a variable to store all the generated links */
  let html = '';
  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into html variable */
    html += linkHTML;
  }

  /* insert all the links into titleList */
  titleList.innerHTML = html;

  /* bind click events to the links */
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
/* Call the function to generate title links */
generateTitleLinks();

const params = {
  max: 0,
  min: 999999
};

function calculateTagsParams(tags) {
  for (let tag in tags) {
    if(tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if(tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  //* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let tagHtml = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){

      /* generate HTML of the link */
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.tagLinkArticle(linkHTMLData);

      /* add generated code to html variable */
      tagHtml += linkHTML;

      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = tagHtml;

  /* END LOOP: for every article: */
  }

  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] create variable for all links HTML code */
  //let allTagsHTML = '';
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });

    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();

addClickListenersToTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const links = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let link of links) {
    /* add class active */
    link.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

function generateAuthors() {
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article */
  for (let article of articles) {
    //* get the author from data-author attribute */
    const author = article.getAttribute('data-author');
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* generate HTML for the author link (display author as a link)*/
    const linkHTMLData = { id: author, title: author };
    const linkHTML = templates.authorLinkArticle(linkHTMLData);
    /* insert HTML into author wrapper */
    authorWrapper.innerHTML = linkHTML;

    /* Count the occurrences of each author */
    if (!allAuthors[author]) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  }

  /* find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);
  const allAuthorsData = { authors: [] };

  /* Generate the HTML for each author */
  for (let author in allAuthors) {
    allAuthorsData.authors.push({
      id: author,
      title: author,
      count: allAuthors[author],
    });
  }

  /* insert generated authors HTML into the right column */
  authorList.innerHTML = templates.authorLinkListArticle(allAuthorsData);
  /* END LOOP */
}
generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const activeAuthorsLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorsLinks) {
    /* remove class active */
    activeAuthorLink.classList.remove('active');
    /* END LOOP */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP */
  }

  /* call function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to authors */
  const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let allAuthorLink of allAuthorLinks) {
    /* add authorClickHandler as event listener for that link */
    allAuthorLink.addEventListener('click', authorClickHandler);
    /* END LOOP */
  }
}
addClickListenersToAuthors();

