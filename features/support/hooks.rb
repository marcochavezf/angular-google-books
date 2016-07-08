Before do
  if $phantomjs
    # Workaround for phantomjs issue with site running locally on mac os x
    sleep(2)
    visit BASE_URL
  end
end
