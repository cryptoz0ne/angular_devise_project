class User < ActiveRecord::Base
  enum role: [:user, :vip, :admin]
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    self.role ||= :user
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable


  # def update_with_password(params={})
  #   current_password = params.delete(:current_password)

  #   if params[:password].blank?
  #     params.delete(:password)
  #     params.delete(:password_confirmation) if params[:password_confirmation].blank?
  #   end 
  #   valid_pwd = valid_password?(current_password) 
  #   result = if current_password.blank? || valid_pwd
  #     update_attributes(params)
  #   else
  #     self.errors.add(:current_password, current_password.blank? ? :blank : :invalid)
  #     self.attributes = params
  #     false
  #   end 

  #   clean_up_passwords
  #   result
  # end
  
end
