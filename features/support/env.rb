require 'pry'
require 'rspec/expectations'
require 'capybara/cucumber'

BASE_URL = ENV['BASE_URL'] || 'http://localhost:9000'

#--------------------------------
# Run mode settings
#--------------------------------
if ENV['IN_BROWSER']
  # Run Locally
  # RUN_IN_BROWSER=true PAUSE=1 bundle exec cucumber
  Capybara.default_driver = :selenium
  Capybara.javascript_driver = :selenium
  Capybara.current_session.driver.browser.manage.window.maximize
elsif ENV["SAUCELABS"]
  # Run on SauceLab
  require 'sauce/capybara'
  require 'sauce/cucumber'
  Capybara.default_driver = :sauce
  Capybara.javascript_driver = :sauce
else
  # DEFAULT: Run headless tests locally with poltergeist/PhantomJS
  require 'capybara/poltergeist'
  Capybara.register_driver :poltergeist do |app|
    Capybara::Poltergeist::Driver.new(
        app,
        window_size: [1280, 1024],
        js_errors: false,
        timeout: 20,
        phantomjs_options: ['--local-to-remote-url-access=yes', '--disk-cache=true']
      )
  end
  Capybara.default_driver = :poltergeist
  Capybara.javascript_driver = :poltergeist
  # sleep(1) #Workaround for localhost mac os x issue
  $phantomjs = true
end

#--------------------------------
# Capybara settings
#--------------------------------
Capybara.default_max_wait_time = 30
Capybara.ignore_hidden_elements = :false
Capybara.default_selector = :css
World(RSpec::Matchers)
