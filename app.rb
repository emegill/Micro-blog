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
    @friends_user_ids = []
    friendships_1 = Friendship.where(user_id: @user.id, status: 1)
    friendships_2 = Friendship.where(other_user_id: @user.id, status: 1)
    friendships_1.each do |ship|
        @friends_user_ids.push(ship.other_user_id)
    end
    friendships_2.each do |ship|
        @friends_user_ids.push(ship.user_id)
    end

    if session[:user_id]
        if session[:user_id] == @user.id
            @this_user = true
        end
        @viewing_user = User.find(session[:user_id])
        @favorites_blog_ids = []
        @viewing_user.favorites.each do |favorite|
            @favorites_blog_ids.push(favorite.blog_id)
        end

        friendships_1 = Friendship.where(user_id: @user.id)
        friend_user_ids_1 = []
        friendships_1.each do |ship|
            if ship.status == 1
                friend_user_ids_1.push(ship.other_user_id)
            end
        end
        friendships_2 = Friendship.where(other_user_id: @user.id)
        friend_user_ids_2 = []
        friendships_2.each do |ship|
            if ship.status == 1
                friend_user_ids_2.push(ship.user_id)
            end
        end
        @friends_user_ids = friend_user_ids_1 + friend_user_ids_2

        @friends_blogs = []
        @friends_user_ids.each do |user_id|
            @friends_blogs += Blog.where(user_id: user_id)
        end
        friends_blog_ids = []
        @friends_blogs.each do |blog|
            friends_blog_ids.push(blog.id)
        end
        @friends_blog_ids = friends_blog_ids.sort.reverse
    end
    erb :account
end

post '/edit_user' do
    user = User.find(session[:user_id])
    pw_check = false
    if params[:password_check] == user.password
        pw_check = true
    end
    params.delete(:password_check)
    params.delete(:captures)
    if params[:password_new]
        if params[:password_new] == params[:password]
            params.delete(:password_new)
        else
            pw_check = false
        end
    else
        params.delete(:password)
    end
    if pw_check
        params.each do |symb, val|
            user.update(symb => val) if val.length > 0
        end
    end
    redirect "/account/#{user.id}"
end

post '/delete_user' do
    User.destroy(session[:user_id])
    redirect '/'
end

post '/search_user' do
    user_input = params[:username]
    user = User.where(username: user_input).first
    if user == nil
        redirect "/user_not_found/#{user_input}"
    else
        redirect "/account/#{user.id}"
    end
end

get '/user_not_found/:username' do
    @username = params[:username]
    erb :user_not_found
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
    blog.update(title: params[:title])
    blog.update(content: params[:content])
    redirect params[:redirect_to]
end

post '/destroy_blog/:id' do
    Blog.destroy(params[:id])
    redirect params[:redirect_to]
end

get '/blogs' do
    if session[:user_id]
        @user = User.find(session[:user_id])
        @favorites_ids = []
        @favorites_blog_ids = []
        @user.favorites.each do |favorite|
            @favorites_ids.push(favorite.id)
            @favorites_blog_ids.push(favorite.blog_id)
        end
    end
    @blogs = Blog.all.reverse
    if @blogs.length < 10
        @top_10 = @blogs
    else
        @top_10 = @blogs[0, 10]
    end
    erb :blogs
end

post '/create_favorite' do
    Favorite.create(params[:favorite])
    redirect params[:redirect_to]
end

post '/destroy_favorite' do
    Favorite.destroy(params[:favorite_id])
    redirect params[:redirect_to]
end

get '/favorites' do
    redirect '/' if session[:user_id] == nil
    @user = User.find(session[:user_id])
    erb :favorites
end

post '/create_reblog' do
    Reblog.create(params[:reblog])
    Blog.create(params[:blog])
    redirect params[:redirect_to]
end

post '/create_friendship' do
    Friendship.create(params[:friendship])
    redirect params[:redirect_to]
end

post '/destroy_friendship' do
    friendship = Friendship.where(params[:friendship])[0]
    Friendship.destroy(friendship.id)
    redirect params[:redirect_to]
end

post '/confirm_friendship' do
    friendship = Friendship.where(params[:friendship])[0]
    friendship.update(status: 1)
    redirect params[:redirect_to]
end

get '/friends' do
    redirect '/' if session[:user_id] == nil
    @user = User.find(session[:user_id])
    friendships_1 = Friendship.where(user_id: @user.id)
    friend_user_ids_1 = []
    friendships_1.each do |ship|
        if ship.status == 1
            friend_user_ids_1.push(ship.other_user_id)
        end
    end
    friendships_2 = Friendship.where(other_user_id: @user.id)
    friend_user_ids_2 = []
    @pending_requests_user_ids = []
    friendships_2.each do |ship|
        if ship.status == 1
            friend_user_ids_2.push(ship.user_id)
        elsif ship.status == 0
            @pending_requests_user_ids.push(ship.user_id)
        end
    end
    @friend_user_ids = friend_user_ids_1 + friend_user_ids_2
    @friends = []
    @friend_user_ids.each do |id|
        @friends.push(User.find(id))
    end
    erb :friends
end

#
