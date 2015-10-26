/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This test suite is for the allFeeds variable */
    describe('RSS Feeds', function() {
       
        /* Test that checks if allFeeds is defined and not an empty object */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed in the allFeeds object and ensures that a URL is defined and it is not empty*/
        it('URL is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });
        
        /* Loops through each feed in the allFeeds object and ensures that it has a name defined and that the name is not empty */
        it('name is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    /* This test suite is for the menu */
    describe('The Menu', function(){

        /* Tests if the menu is hidden by default */
        it('menu element is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Tests if the menu is shown when the menu icon is clicked */
        it('menu is visible when icon clicked', function() {
            $('menu-icon-link').click();
            expect($('body').hasClass('menu-midden')).toBe(false);
        });

        /* Tests if the menu goes back to being hidden when the menu icon is clicked again */
        it('menu is hidden when icon clicked again', function() {
            $('menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite for initial entries */
    describe('Inital Entries', function() {

        /* The beforeEach function is called once before each spec in this test suite */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test ensures that there is at least one .entry element within the .feed container when the loadFeed function is called by beforeEach */
        it('at least a single .entry', function(done) {
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* Test suite for when a new feed is loaded */
    describe('New Feed Selection', function() {
        var oldEntry;
        var newEntry;

        /* Runs before each spec in this test suite */
        beforeEach(function(done) {
            loadFeed(0, function () {
                oldEntry = $('.entry').html(); /* Stores content from first loadFeed */
                loadFeed(1, function() {
                    newEntry = $('.entry').html(); /* Stores content from second loadFeed */
                    done();
                });
            });
        });

        /* Tests that content actually changes */
        it('feed content changes', function(done) {
            expect(newEntry).not.toBe(oldEntry);
            done();
        });
    }); 
}());
