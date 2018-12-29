const sources = new Array(
    'https://www.pexels.com/search/%q/',
    'https://unsplash.com/search/photos/%q',
    'https://pixabay.com/en/photos/%q/',
    'https://kaboompics.com/gallery?search=%q'
);

browser.omnibox.setDefaultSuggestion({
    description: `Please enter a keyword or phrase you want to search for.`
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
    var isFirst = true;
    sources.forEach(function(url) {
        let searchUrl = url.replace('%q', text)
        if (isFirst) {
            isFirst = false;
            browser.tabs.update({url : searchUrl});
        } else {
            browser.tabs.create({url : searchUrl});
        }
    });
});