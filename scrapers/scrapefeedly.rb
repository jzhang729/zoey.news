require './scraper'

items_to_scrape = 200

globeandmail = open("http://feedly.com/v3/streams/contents?streamId=feed/http://www.theglobeandmail.com/news/politics/?service=rss&count=#{items_to_scrape}").read
nationalpost = open("http://feedly.com/v3/streams/contents?streamId=feed/http://news.nationalpost.com/category/news/canada/canadian-politics/feed/&count=#{items_to_scrape}").read

puts "\n"
puts "Scraping Globe and Mail"
parseArticles(globeandmail)
puts "\n"
puts "Scraping National Post"
parseArticles(nationalpost)
puts "\n** Scraping complete **\n "
