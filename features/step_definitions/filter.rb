Given(/^I input "([^"]*)" on the "([^"]*)" field$/) do |text, field|
  fill_in field, with: text
end

Then(/^the result list will contain "([^"]*)" books$/) do |amount|
  if amount == "No books"
    element = find 'div.list-group'
    expect(element).to have_content(amount)
  else
    expect(page).to have_selector('a.list-group-item', count: amount)
  end
end
