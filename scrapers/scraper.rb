require 'rubygems'
require 'open-uri'
require 'json'
require 'pg'
require 'readability'
require './dbconfig'
require 'pry'
require 'byebug'

@conn = PG::Connection.open( dbname: DATABASE )

class Article

  attr_reader :title, :date, :url, :publisher_id, :full_text

  def initialize(url, date, title, publisher_id, full_text)
    @url = url
    @date = date
    @title = title
    @publisher_id = publisher_id
    @full_text = full_text
  end

end

def parseArticles(feed)
  duplicates = 0
  errors = []
  @items_successfully_added = 0
  publishers = {}
  @conn.exec_params('SELECT id, domain FROM publishers').each do |hash|
    publishers[hash["domain"]] = hash["id"].to_i
  end
  JSON.parse(feed)["items"].each do |item|
    url = item["alternate"][0]["href"]
    date = Time.at(item["published"] / 1000).to_date.to_s
    title = item["title"]
    domain = item["alternate"][0]["href"].match(/\w*\.\w*\//)[0].chop
    if publishers[domain]
      publisher_id = publishers[domain]
    else
      publisher_id = @conn.exec_params("INSERT INTO publishers (domain) VALUES ($1) RETURNING id", [domain])[0]["id"].to_i
      publishers[domain] = publisher_id
    end
    begin
      full_text = "#{title}" + " "
      html_page = open(url).read
      full_text += Readability::Document.new(html_page, :tags => []).content
      full_text.gsub!(/\n/, " ")
      full_text.gsub!(".", ". ")
      article = Article.new(url, date, title, publisher_id, full_text)
      addToDatabase(article)
    rescue PG::UniqueViolation
      duplicates += 1
    rescue Exception => error
      errors << "Error adding item #{url}: #{error}"
    end
  end
  puts "\n#{@items_successfully_added} item#{"s" if @items_successfully_added != 1} successfully added."
  puts "#{duplicates} item#{"s" if duplicates != 1} already in database."
  errors.each { |error| puts error }
  @items_successfully_added = 0
end

def addToDatabase(article)
  sql = "INSERT INTO articles (url, publisher_id, publication_date, title, full_text) VALUES ($1, $2, $3, $4, $5) RETURNING id"
  new_id = @conn.exec_params(sql, [article.url, article.publisher_id, article.date, article.title, article.full_text])[0]["id"].to_i
  if new_id.integer?
    @conn.exec_params('UPDATE articles SET parsed_text = (SELECT to_tsvector(full_text)) WHERE id = $1', [new_id])
    @items_successfully_added += 1
  end
  print "."
end
