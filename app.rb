require 'sinatra'
require 'sinatra/activerecord'

set :database, 'sqlite3:app.sqlite3'
set :sessions, true

require './models'

get '/' do
    if session[:user_id]
        redirect "/account/#{session[:user_id]}"
    end
    erb :home
end

post '/sign_in' do
    user = User.where(username: params[:username]).first
    redirect '/' if user == nil
    if user.password == params[:password]
        session[:user_id] = user.id
        redirect "/account/#{user.id}"
    else
        redirect '/'
    end
end

get '/sign_out' do
    session[:user_id] = nil
    redirect '/'
end

post '/create_user' do
    user = User.create(params[:user])
    session[:user_id] = user.id
    redirect "/account/#{user.id}"
end

get '/account/:id' do
    @user = User.find(params[:id])
    @blogs = @user.blogs.reverse
    if session[:user_id] == @user.id
        @this_user = true
    else
        @this_user = false
    end
    erb :account
end

post '/edit_user' do
    user = User.find(session[:user_id])
    if user.password == params[:password]
        params.delete(:password)
        params.delete(:captures)
        params.each do |symb, val|
            user.update(symb => val)
        end
    end
    redirect "/account/#{user.id}"
end

post '/delete_user' do
    User.destroy(session[:user_id])
    redirect '/'
end

post '/create_blog' do
    @user = User.find(session[:user_id])
    Blog.create(params[:blog])
    redirect "/account/#{@user.id}"
end

post '/update_blog' do
    id = params[:blog_id]
    p params
    blog = Blog.find(id)
    blog.title = params[:title]
    blog.content = params[:content]

    blog.save
    redirect "/account/#{params[:user_id]}"
end

post '/delete_blog/:id' do
    Blog.destroy(params[:id])
    redirect "/account/#{session[:user_id]}"
end

get '/blogs' do
    @blogs = Blog.all.reverse
    if @blogs.length < 10
        @top_10 = @blogs
    else
        @top_10 = @blogs[0, 10]
    end
    erb :blogs
end
