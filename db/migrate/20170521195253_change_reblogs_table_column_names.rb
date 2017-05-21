class ChangeReblogsTableColumnNames < ActiveRecord::Migration[5.1]
  def change
      rename_column :reblogs, :new_blog_id, :original_blog_id
      rename_column :reblogs, :original_blog_user_id, :user_id
  end
end
