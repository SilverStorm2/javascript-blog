'use strict'; //pokazuje błędy, np literówka w słowie counter

<<<<<<< HEAD
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

/** Selector options
 *
 */
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
=======
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list-horizontal',
  optTagsListSelector = '.tags',
  optArticleAuthorSelector = '.post-author',
  optAuthorsListSelector = '.authors',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

const titleClickHandler = function () {
  const clickedElement = this;
  console.log('Link was clicked!');

  //Usunięcie klasy 'active' ze wszystkich linków artykułów
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  //Dodanie klasy 'active' do klikniętego linku
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  //Usunięcie klasy 'active' ze wszystkich artykułów
  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  //Pobranie atrybutu 'href' z klikniętego linku
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);

  //Znalezienie odpowiedniego artykułu za pomocą selektora
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle:', targetArticle);

  //Dodanie klasy 'active' do wybranego artykułu
  targetArticle.classList.add('active');
};

// Funkcja do generowania listy tytułów artykułów
function generateTitleLinks() {
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
  const titleList = document.querySelector(optTitleListSelector);

<<<<<<< HEAD
  function clearElement() {
    titleList.innerHTML = '';
  }
  clearElement();

  /* create a variable to store all the generated links */
=======
  //Pobranie wszystkich artykułów
  const articles = document.querySelectorAll(optArticleSelector);
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
  let html = '';
  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  //Pętla po wszystkich artykułach
  for (let article of articles) {
    //Pobranie id artykułu
    const articleId = article.getAttribute('id');

    //Pobranie tytułu artykułu
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

<<<<<<< HEAD
    /* create HTML of the link */
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into html variable */
=======
    //Tworzenie kodu HTML linku
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
    html += linkHTML;
  }

  // Dodanie wszystkich linków do listy w lewej kolumnie
  titleList.innerHTML = html;

  // Dodanie nasłuchiwania na kliknięcia w tytuły
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

<<<<<<< HEAD
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

=======
// Funkcja do generowania chmury tagów na podstawie liczby wystąpień
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

// Funkcja do generowania listy tagów
function generateTags() {
  // Znalezienie wszystkich artykułów
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

<<<<<<< HEAD
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
=======
  // START LOOP: Pętla po wszystkich artykułach
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f

  for (let article of articles) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    const articleTags = article.getAttribute('data-tags');
    let html = '';

<<<<<<< HEAD
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let tagHtml ='';

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
=======
    // Podział tagów na tablicę - split tags into array
    const tagsArray = articleTags.split(' ');

    /* START LOOP: pętla dla każdego tagu - for each tag */
    for (let tag of tagsArray) {
      const tagHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html += tagHtml;
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f

      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
<<<<<<< HEAD


    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = tagHtml;

  /* END LOOP: for every article: */
  }

  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] create variable for all links HTML code */
  //let allTagsHTML = '';
=======
    tagsWrapper.innerHTML = html;
  }

  const tagList = document.querySelector(optTagsListSelector);
  let allTagsHTML = '';
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  const allTagsData = { tags: [] };

<<<<<<< HEAD
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

/** Call the function to generate tags
 *
 * @param {*} event
 */
=======
  // Pętla po wszystkich tagach w obiekcie allTags
  for (let tag in allTags) {
    const tagLinkHTML =
      '<li><a href="#tag-' +
      tag +
      '" class="' +
      calculateTagClass(allTags[tag], tagsParams) +
      '">' +
      tag +
      ' (' +
      allTags[tag] +
      ')</a></li>';
    allTagsHTML += tagLinkHTML;
  }

  /* Dodanie wygenerowanych tagów do listy tagów - add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

// Obliczenie minimalnej i maksymalnej liczby wystąpień tagów
function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }

    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}
generateTags();

// Funkcja do obsługi kliknięcia na tag
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

<<<<<<< HEAD
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

=======
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

// Funkcja dodająca nasłuchiwanie na kliknięcia w tagi
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
<<<<<<< HEAD
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
=======

  for (let link of tagLinks) {
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

function generateAuthors() {
<<<<<<< HEAD
  let allAuthors = {};

  /* find all articles */
=======
  /* Utworzenie nowego obiektu allAuthors, który będzie przechowywać autorów i ich liczbę */
  let allAuthors = {};

  // Znalezienie wszystkich artykułów
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article */
  for (let article of articles) {
    // Pobranie autora z atrybutu data-author
    const author = article.getAttribute('data-author');
<<<<<<< HEAD
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* generate HTML for the author link (display author as a link)*/
    const linkHTMLData = { id: author, title: author };
    const linkHTML = templates.authorLinkArticle(linkHTMLData);
    /* insert HTML into author wrapper */
    authorWrapper.innerHTML = linkHTML;

    /* Count the occurrences of each author */
=======

    /* Znalezienie miejsca w artykule, gdzie ma być wyświetlony autor - find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* Wygenerowanie HTML dla linku autora - generate HTML for the author link */
    const authorHTML =
      '<a href="#author-' + author.replace(' ', '-') + '">' + author + '</a>';

    /* Dodanie wygenerowanego kodu HTML do kontenera w artykule - insert HTML into author wrapper */
    authorWrapper.innerHTML = authorHTML;

    /* Sprawdzenie, czy dany autor już istnieje w obiekcie allAuthors */
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
    if (!allAuthors[author]) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  }

<<<<<<< HEAD
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
=======
  /* Znalezienie listy autorów w prawej kolumnie */
  const authorList = document.querySelector(optAuthorsListSelector);

  /* Utworzenie zmiennej na cały wygenerowany kod HTML */
  let allAuthorsHTML = '';

  /* START LOOP: dla każdego autora w obiekcie allAuthors */
  for (let author in allAuthors) {
    /* Wygenerowanie kodu HTML dla linku autora */
    const authorLinkHTML =
      '<li><a href="#author-' +
      author.replace(' ', '-') +
      '">' +
      author +
      ' (' +
      allAuthors[author] +
      ')</a></li>';
    allAuthorsHTML += authorLinkHTML;
  }
  /* Dodanie wygenerowanej listy autorów do kontenera w prawej kolumnie */
  authorList.innerHTML = allAuthorsHTML;
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
}
generateAuthors();

function authorClickHandler(event) {
  /* Zapobiegnięcie domyślnej akcji przeglądarki */
  event.preventDefault();

  /* Utworzenie stałej clickedElement, która przechowuje kliknięty element */
  const clickedElement = this;

  /* Pobranie atrybutu href z klikniętego elementu */
  const href = clickedElement.getAttribute('href');

<<<<<<< HEAD
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const activeAuthorsLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorsLinks) {
=======
  /* Wydobycie nazwy autora z atrybutu href */
  const author = href.replace('#author-', '').replace('-', ' ');

  /* Znalezienie wszystkich aktywnych linków autorów */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: dla każdego aktywnego linku autora */
  for (let activeAuthor of activeAuthors) {
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
    /* remove class active */
    activeAuthorLink.classList.remove('active');
    /* END LOOP */
  }

  /* Znalezienie wszystkich linków autora, które mają atrybut href równy zmiennej href */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
<<<<<<< HEAD
  /* START LOOP: for each found author link */
=======

  /* START LOOP: dla każdego linku autora */
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP */
  }

<<<<<<< HEAD
  /* call function "generateTitleLinks" with article selector as argument */
=======
  /* Wywołanie funkcji generateTitleLinks z filtrem na wybranego autora */
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
<<<<<<< HEAD
  /* find all links to authors */
  const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let allAuthorLink of allAuthorLinks) {
    /* add authorClickHandler as event listener for that link */
    allAuthorLink.addEventListener('click', authorClickHandler);
    /* END LOOP */
  }
}
=======
  /* Znalezienie wszystkich linków do autorów */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: dla każdego linku */
  for (let link of authorLinks) {
    /** Dodanie nasłuchiwania na kliknięcia */
    link.addEventListener('click', authorClickHandler);
  }
}
generateAuthors();
>>>>>>> f5ec186997389ce9d4ee7cf00bead374e065700f
addClickListenersToAuthors();

