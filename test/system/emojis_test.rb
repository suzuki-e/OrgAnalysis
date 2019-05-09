require "application_system_test_case"

class EmojisTest < ApplicationSystemTestCase
  setup do
    @emoji = emojis(:one)
  end

  test "visiting the index" do
    visit emojis_url
    assert_selector "h1", text: "Emojis"
  end

  test "creating a Emoji" do
    visit emojis_url
    click_on "New Emoji"

    fill_in "Url", with: @emoji.url
    click_on "Create Emoji"

    assert_text "Emoji was successfully created"
    click_on "Back"
  end

  test "updating a Emoji" do
    visit emojis_url
    click_on "Edit", match: :first

    fill_in "Url", with: @emoji.url
    click_on "Update Emoji"

    assert_text "Emoji was successfully updated"
    click_on "Back"
  end

  test "destroying a Emoji" do
    visit emojis_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Emoji was successfully destroyed"
  end
end
