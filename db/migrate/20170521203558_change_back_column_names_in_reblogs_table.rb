class ChangeBackColumnNamesInReblogsTable < ActiveRecord::Migration[5.1]
  def change
      rename_column :reblogs, :original_blog_id, :new_blog_id
      rename_column :reblogs, :user_id, :original_user_id
  end
end
