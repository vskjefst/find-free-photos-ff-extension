const services = new Array(
    {
        tabId: -1,
        url: 'https://www.pexels.com/search/%q/'
    },
    {
        tabId: -1,
        url: 'https://unsplash.com/search/photos/%q'
    },
    {
        tabId: -1,
        url: 'https://pixabay.com/en/photos/%q/'
    },
    {
        tabId: -1,
        url: 'https://kaboompics.com/gallery?search=%q'
    }
);

browser.omnibox.setDefaultSuggestion({
    description: `Please enter a keyword or phrase you want to search for.`
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
    var noTabsExists = true;
    services.forEach(function(service, index) {
        let searchUrl = service.url.replace('%q', text);
        if (service.tabId != -1) {
            browser.tabs.get(service.tabId).then(
                function() {
                    browser.tabs.update(service.tabId, {url : searchUrl}).then(function(updatedTab) {
                        service.tabId = updatedTab.id;
                    });
                },
                function() {
                    browser.tabs.create({url : searchUrl}).then(function(createdTab) {
                        service.tabId = createdTab.id;
                    });
                });
        } else {
            if (noTabsExists) {
                noTabsExists = false;
                browser.tabs.update({url : searchUrl}).then(function(updatedTab) {
                    service.tabId = updatedTab.id;
                });
            } else {
                browser.tabs.create({url : searchUrl}).then(function(createdTab) {
                    service.tabId = createdTab.id;
                });
            }
        }
    });
});