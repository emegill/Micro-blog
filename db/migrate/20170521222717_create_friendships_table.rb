class CreateFriendshipsTable < ActiveRecord::Migration[5.1]
  def change
      create_table :friendships do |t|
          t.integer :user_id
          t.integer :other_user_id
          t.integer :status
      end
  end
end
