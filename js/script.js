'use strict'; //pokazuje błędy, np literówka w słowie counter

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list-horizontal',
  optTagsListSelector = '.tags',
  optArticleAuthorSelector = '.post-author',
  optAuthorsListSelector = '.authors',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';


const titleClickHandler = function(){
  const clickedElement = this;
  console.log('Link was clicked!');

  //Usunięcie klasy 'active' ze wszystkich linków artykułów
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  //Dodanie klasy 'active' do klikniętego linku
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  //Usunięcie klasy 'active' ze wszystkich artykułów
  const activeArticles = document.querySelectorAll('.post.active');
  for(let activeArticle of activeArticles){
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
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  //Pobranie wszystkich artykułów
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';

  //Pętla po wszystkich artykułach
  for (let article of articles) {

    //Pobranie id artykułu
    const articleId = article.getAttribute('id');

    //Pobranie tytułu artykułu
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    //Tworzenie kodu HTML linku
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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

// Funkcja do generowania chmury tagów na podstawie liczby wystąpień
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

// Funkcja do generowania listy tagów
function generateTags(){

  // Znalezienie wszystkich artykułów
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  // START LOOP: Pętla po wszystkich artykułach

  for (let article of articles){
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    const articleTags = article.getAttribute('data-tags');
    let html='';

    // Podział tagów na tablicę - split tags into array
    const tagsArray = articleTags.split(' ');

    /* START LOOP: pętla dla każdego tagu - for each tag */
    for (let tag of tagsArray){
      const tagHtml='<li><a href="#tag-'+ tag + '">' + tag +'</a></li>';
      html += tagHtml;

      if(!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML=html;
  }

  const tagList = document.querySelector(optTagsListSelector);
  let allTagsHTML = '';
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  // Pętla po wszystkich tagach w obiekcie allTags
  for(let tag in allTags){
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
    allTagsHTML += tagLinkHTML;
  }

  /* Dodanie wygenerowanych tagów do listy tagów - add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

// Obliczenie minimalnej i maksymalnej liczby wystąpień tagów
function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if(tags[tag] > params.max) {
      params.max = tags[tag];
    }

    if(tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}
generateTags();

// Funkcja do obsługi kliknięcia na tag
function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

// Funkcja dodająca nasłuchiwanie na kliknięcia w tagi
function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  for (let link of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();

function generateAuthors() {

  //  /* Utworzenie nowego obiektu allAuthors, który będzie przechowywać autorów i ich liczbę */
  let allAuthors = {};

  // Znalezienie wszystkich artykułów
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article */
  for (let article of articles) {
    // Pobranie autora z atrybutu data-author
    const author = article.getAttribute('data-author');

    /* Znalezienie miejsca w artykule, gdzie ma być wyświetlony autor - find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* Wygenerowanie HTML dla linku autora - generate HTML for the author link */
    const authorHTML = '<a href="#author-' + author.replace(' ', '-') + '">' + author + '</a>';

    /* Dodanie wygenerowanego kodu HTML do kontenera w artykule - insert HTML into author wrapper */
    authorWrapper.innerHTML = authorHTML;

    /* Sprawdzenie, czy dany autor już istnieje w obiekcie allAuthors */
    if(!allAuthors[author]){
      allAuthors[author]=1;
    } else{
      allAuthors[author]++;
    }
  }

  /* Znalezienie listy autorów w prawej kolumnie */
  const authorList = document.querySelector(optAuthorsListSelector);

  /* Utworzenie zmiennej na cały wygenerowany kod HTML */
  let allAuthorsHTML = '';

  /* START LOOP: dla każdego autora w obiekcie allAuthors */
  for (let author in allAuthors){
    /* Wygenerowanie kodu HTML dla linku autora */
    const authorLinkHTML = '<li><a href="#author-' + author.replace(' ', '-') + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
    allAuthorsHTML += authorLinkHTML;
  }
  /* Dodanie wygenerowanej listy autorów do kontenera w prawej kolumnie */
  authorList.innerHTML = allAuthorsHTML;
}
generateAuthors();

function authorClickHandler(event) {
  /* Zapobiegnięcie domyślnej akcji przeglądarki */
  event.preventDefault();

  /* Utworzenie stałej clickedElement, która przechowuje kliknięty element */
  const clickedElement = this;

  /* Pobranie atrybutu href z klikniętego elementu */
  const href = clickedElement.getAttribute('href');

  /* Wydobycie nazwy autora z atrybutu href */
  const author = href.replace('#author-', '').replace('-', ' ');

  /* Znalezienie wszystkich aktywnych linków autorów */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: dla każdego aktywnego linku autora */
  for (let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');
  }

  /* Znalezienie wszystkich linków autora, które mają atrybut href równy zmiennej href */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: dla każdego linku autora */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
  }

  /* Wywołanie funkcji generateTitleLinks z filtrem na wybranego autora */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* Znalezienie wszystkich linków do autorów */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: dla każdego linku */
  for (let link of authorLinks) {
    /* Dodanie nasłuchiwania na kliknięcia */
    link.addEventListener('click', authorClickHandler);
  }
}
generateAuthors();
addClickListenersToAuthors();
