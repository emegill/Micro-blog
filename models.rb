class User < ActiveRecord::Base
    has_many :blogs, dependent: :destroy
    has_many :favorites, dependent: :destroy
    has_many :reblogs
    has_many :friendships, dependent: :destroy
end

class Blog < ActiveRecord::Base
    belongs_to :user
    has_many :favorites, dependent: :destroy
    has_one :reblog, dependent: :destroy
end

class Favorite < ActiveRecord::Base
    belongs_to :user
    belongs_to :blog
end

class Reblog < ActiveRecord::Base
    belongs_to :blog
    belongs_to :user
end

class Friendship < ActiveRecord::Base
    belongs_to :user
end
