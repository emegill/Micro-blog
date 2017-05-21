class User < ActiveRecord::Base
    has_many :blogs, dependent: :destroy
    has_many :favorites, dependent: :destroy
    has_many :reblogs
end

class Blog < ActiveRecord::Base
    belongs_to :user
    has_many :favorites, dependent: :destroy
    has_one :reblog
end

class Favorite < ActiveRecord::Base
    belongs_to :user
    belongs_to :blog
end

class Reblog < ActiveRecord::Base
    belongs_to :blog
    belongs_to :user
end
