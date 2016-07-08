Before do
  # Workaround for phantomjs issue with site running locally on mac os x
  if $phantomjs
    unless ENV['BASE_URL']
      sleep(2)
      visit BASE_URL
    end
  end
end
