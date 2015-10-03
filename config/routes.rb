Rails.application.routes.draw do
  root to: 'visitors#index'
  devise_for :users
  get 'get-current-user', to: 'visitors#get_current_user'
end
