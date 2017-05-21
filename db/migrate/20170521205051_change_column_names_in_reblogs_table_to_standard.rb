class ChangeColumnNamesInReblogsTableToStandard < ActiveRecord::Migration[5.1]
  def change
      rename_column :reblogs, :new_blog_id, :blog_id
      rename_column :reblogs, :original_user_id, :user_id
  end
end
