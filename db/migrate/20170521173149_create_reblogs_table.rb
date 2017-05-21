class CreateReblogsTable < ActiveRecord::Migration[5.1]
  def change
      create_table :reblogs do |t|
          t.integer :new_blog_id
          t.integer :original_blog_user_id
      end
  end
end
