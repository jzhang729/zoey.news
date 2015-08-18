require './scraper'

# QUERY Parameters
# ----------------
#
# # The query_parameters determine the scope of the scrape. All parameters are
# optional, but the default scrape with no parameters will return only the most
# recent 20 articles from each feed.
#
# Relevant options:
# -----------------

# count
# Optional integer number of entry ids to return. default is 20. max is 10,000.
#
# ranked
# Optional string newest or oldest. default is newest.
#
# newerThan
# Optional long timestamp in ms.
#
# For reference, the election was called on Sunday, August 8, 2015.
# 12:00:01AM EDT on that date corresponds to an epoch time of 1438488001.
#
# To scrape articles since that date,
# set query parameters to "&newerThan=1438488001&count=10000"


query_parameters = "&newerThan=1438488001&count=100000"

globeandmail = open("http://feedly.com/v3/streams/contents?streamId=feed/http://www.theglobeandmail.com/news/politics/?service=rss#{query_parameters}").read
nationalpost = open("http://feedly.com/v3/streams/contents?streamId=feed/http://news.nationalpost.com/category/news/canada/canadian-politics/feed/#{query_parameters}").read
cbc =          open("http://feedly.com/v3/streams/contents?streamId=feed/http://rss.cbc.ca/lineup/politics.xml#{query_parameters}").read
vancouversun = open("http://feedly.com/v3/streams/contents?streamId=feed/http://rss.canada.com/get/?F7431#{query_parameters}").read
torontostar = open("http://feedly.com/v3/streams/contents?streamId=feed/http://www.thestar.com/feeds.articles.news.canada.rss#{query_parameters}").read


puts "\n"
puts "Scraping Globe and Mail"
parseArticles(globeandmail)
puts "\n"
puts "Scraping National Post"
parseArticles(nationalpost)
puts "\n"
puts "Scraping CBC"
parseArticles(cbc)
puts "\n"
puts "Scraping Vancouver Sun"
parseArticles(vancouversun)
puts "\n"
puts "Scraping Toronto Star"
parseArticles(torontostar)
puts "\n** Scraping complete **\n "
