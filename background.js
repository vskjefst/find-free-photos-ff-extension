const services = [
    {
    tabId: -1,
    url: 'https://www.pexels.com/search/%q/'
    },
    {
        tabId: -1,
        url: 'https://unsplash.com/s/photos/%q'
    },
    {
        tabId: -1,
        url: 'https://pixabay.com/en/photos/%q/'
    },
    {
        tabId: -1,
        url: 'https://www.canva.com/photos/search/%q/'
    },
    {
        tabId: -1,
        url: 'https://stocksnap.io/search/%q'
    },
    {
        tabId: -1,
        url: 'https://burst.shopify.com/photos/search?q=%q'
    }
];

browser.omnibox.setDefaultSuggestion({
    description: `Please enter a keyword or phrase you want to search for.`
});

browser.omnibox.onInputEntered.addListener((text) => {
    var noTabsExists = true;
    services.forEach(function(service) {
        let searchUrl = service.url.replace('%q', text);
        if (service.tabId !== -1) {
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