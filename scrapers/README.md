
ZOEY WEB SCRAPERS
-----------------

Zoey's web scrapers are now built in Ruby. They are far slower than their
JavaScript predecessors, but with much better consistency, and now incorporate
error handling, including prevention of duplicate records being inserted.

As well, they are built to easily incorporate any additional
Feedly feeds, with only minor modifications needed to add articles obtained from
other sources.


FILES
-----

Program logic is contained in scraper.rb.

The file 'scrapefeedly.rb' contains the feeds to be scraped. The items_to_scrape
variable sets how many articles to scrape from each feed, beginning with the
most recent article. This will ideally be changed to specify a date range in the
future. Articles already in the database are ignored.


IMPLEMENTATION
--------------

1) Do a bundle install from the Zoey root directory.

2) Create a file named 'dbconfig.rb' in the scrapers directory, and add
   the following line to this file:

      DATABASE = '<your_database_name'>

3) Perform a knex migrate:rollback, and then a knex migrate:latest to empty your
   current database. This step is not necessary before performing subsequent
   scrapes. Note there is no longer any need to run knex seed.

4) In scrapefeedly.rb, change the query parameters as desired. For development
   purposes, parameters have initially been set to scrape the most recent 200
   articles for each source. It is also possible - and more practical when in
   production - to scrape all articles after a certain date. See the comments in
   scrapefeedly.rb for details.

5) Execute the following command:

      ruby scrapefeedly.rb

6) Sit back and watch those articles roll in.
