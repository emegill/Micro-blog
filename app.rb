require 'sinatra'
require 'sinatra/activerecord'

set :database, 'sqlite3:app.sqlite3'
set :sessions, true

require './models'

get '/' do
    erb:home
end
