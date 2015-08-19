
ZOEY
----

Zoey is designed to identify, track and monitor which issues are appearing in
online news articles covering the 2015 Canadian federal election. It does so by
scraping news articles from specified sources and analyzing the frequency of
words appearing in those sources.

This project is a work-in-progress and will be continually updated until the
federal election on October 19, 2015.


SCRAPERS
--------

Zoey's web scrapers are now built in Ruby. They are far slower than their
JavaScript predecessors, but with much better consistency, and now incorporate
error handling, including prevention of duplicate records being inserted.

As well, they are built to easily incorporate any additional
Feedly feeds, with only minor modifications needed to add articles obtained from
other sources.


SCRAPER FILES
-------------

Program logic is contained in scraper.rb.

The file 'scrapefeedly.rb' contains the feeds to be scraped. The items_to_scrape
variable sets how many articles to scrape from each feed, beginning with the
most recent article. This will ideally be changed to specify a date range in the
future. Articles already in the database are ignored.


SCRAPER USAGE
-------------

1) Do a bundle install from the Zoey root directory.

2) Create a file named 'dbconfig.rb' in the scrapers directory, and add
   the following line to this file:

      DATABASE = '<your_database_name'>

3) Perform a knex migrate:rollback as many times as necessary to reset the dataabse,
   and then a knex migrate:latest. Then run 'knex seed:run' to populate the charts 
   table. This step is not necessary before performing subsequent scrapes.

4) In scrapefeedly.rb, change the query parameters as desired. Parameters have now
   been set to scrape the most recent 10,000 articles per feed, starting from 00:00:01
   EDT on Sunday, August 15, 2015.

5) Execute the following command:

      ruby scrapefeedly.rb

6) Sit back and watch those articles roll in.
