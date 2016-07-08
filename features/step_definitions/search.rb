Given(/^I navigate to the Angular Google Books page$/) do
  # binding.pry
  visit BASE_URL
end

Given(/^I input "([^"]*)" on the Search Box$/) do |criteria|
  fill_in "Search terms:", with: criteria
end

When(/^I select the "([^"]*)" button$/) do |name|
  click_button('Update')
end

Then(/^I will see a result list$/) do
  # Lack of feedback on AJAX calls = timing headache
  sleep(1)
  expect(page).to have_selector('.list-group')
end

Then(/^the result list will contain (\d+) books$/) do |amount|
  expect(page).to have_selector('a.list-group-item', count: 10)
end

Then(/^I will see a title for each book$/) do
  all('a.list-group-item').each do |element|
    expect(element).to have_content('Title:')
  end
end

Then(/^I will see a cover picture for each book$/) do
  all('a.list-group-item').each do |element|
    expect(element).to have_css('img')
  end
end

Then(/^I will see a description for each book$/) do
  all('a.list-group-item').each do |element|
    expect(element).to have_css('small')
  end
end
