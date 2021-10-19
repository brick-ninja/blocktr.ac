describe("NotificationSettings", () => {
  describe("dom", () => {
    describe("form-radio-group", () => {
      test.todo("is tied to notification_time")
      test.todo("ties options to notification_times")
    })

    test.todo("renders notification_time")

    describe("notification_time == 0", () => {
      test.todo("Renders notification instantly")
    })
  })

  describe("computed", () => {
    describe("#notification_times", () => {
      test.todo("maps membership_features notification_times")
      test.todo("contains notification_time privilege")
    })
  })

  describe("#created", () => {
    test.todo("sets notification time from profile notification_time")
  })
})
