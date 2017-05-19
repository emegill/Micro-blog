require 'sinatra'
require 'sinatra/activerecord'

set :database, 'sqlite3:app.sqlite3'
set :sessions, true

require './models'

get '/' do
    erb :home
end

post '/sign_in' do
    user = User.where(username: params[:username]).first
    if user.password == params[:password]
        session[:user_id] = user.id
        redirect "/account/#{user.id}"
    else
        redirect '/'
    end
end

post '/create_user' do
    user = User.create(params[:user])
    session[:user_id] = user.id
    redirect "/account/#{user.id}"
end

get '/account/:id' do
    @user = User.find(params[:id])

    erb :account
end

post '/create_blog' do
    @user = User.find(session[:user_id])
    Blog.create(params[:blog])
    redirect "/account/#{@user.id}"
end
