describe("SinksInputs", () => {
  describe("dom", () => {
    describe("tr[0]", () => {
      describe("td[0]", () => {
        describe("checkbox", () => {
          test.todo("is tied to enable_email")
        })
      })

      describe("td[1]", () => {
        describe("multiselect", () => {
          test.todo("'s options are email_options_plus'")

          describe("!enable_email", () => {
            test.todo("is disabled")
          })

          test.todo("is tied to selected['email']")
        })
      })
    })

    describe("tr[1]", () => {
      describe("advanced_sinks", () => {
        test.todo("is not rendered")
      })

      describe("!advanced_sinks", () => {
        test.todo("is rendered")
      })
    })

    describe("tr[2]", () => {
      describe("td[0]", () => {
        describe("checkbox", () => {
          test.todo("is tied to enable_sms")
        })
      })

      describe("td[1]", () => {
        describe("multiselect", () => {
          test.todo("'s options are sms_options_plus'")

          describe("!enable_sms", () => {
            test.todo("is disabled")
          })

          test.todo("is tied to selected['sms']")
        })
      })
    })

    describe("tr[3]", () => {
      describe("td[0]", () => {
        describe("checkbox", () => {
          test.todo("is tied to enable_webhook")
        })
      })

      describe("td[1]", () => {
        describe("multiselect", () => {
          test.todo("'s options are webhook_options_plus'")

          describe("!enable_webhook", () => {
            test.todo("is disabled")
          })

          test.todo("is tied to selected['webhook']")
        })
      })
    })

    describe("#tr[4]", () => {
      test.todo("renders remaining_sinks_msg")
    })
  })

  describe("computed", () => {
    describe("#remaining_sinks", () => {
      test.todo("is authorized_sinks - sinks.length")
    })

    describe("#remaining_sinks_msg", () => {
      describe("remining_sinks == 1", () => {
        test.todo("is '1 available sink is left'")
      })

      test.todo("is 'N available sinks are left'")
    })

    describe("#email_sinks", () => {
      test.todo("is sinks of email type")
    })

    describe("#sms_sinks", () => {
      test.todo("is sinks of sms type")
    })

    describe("#webhook_sinks", () => {
      test.todo("is sinks of webhook type")
    })

    describe("#sinks_by_types", () => {
      test.todo("maps sinks to type")
    })

    describe("#email_options", () => {
      test.todo("is email sinks options")
    })

    describe("#email_options_plus", () => {
      test.todo("is email_options with '+ Add Email'")
    })

    describe("#sms_options", () => {
      test.todo("is sms sinks options")
    })

    describe("#sms_options_plus", () => {
      test.todo("is sms_options with '+ Add Phone Number'")
    })

    describe("#webhook_options", () => {
      test.todo("is webhook sinks options")
    })

    describe("#webhook_options_plus", () => {
      test.todo("is webhook_options with '+ Add URL'")
    })
  })

  describe("watch", () => {
    describe("sinks", () => {
      describe("selected_lifecycle is true", () => {
        test.todo("assigns options to selected")
      })
    })

    describe("selected", () => {
      test.todo("syncs sinks")
    })
  })

  describe("methods", () => {
    describe("#created_sink", () => {
      test.todo("loads sinks")

      describe("!selected_lifecycle", () => {
        test.todo("pushes created sink on selected sinks of given type")
      })
    })

    describe("#sync_sinks", () => {
      describe("'Add New' selected", () => {
        test.todo("removes 'Add New' from selected")
        test.todo("launches create sink modal")
      })

      describe("selected_lifecycle is true", () => {
        describe("selected no longer contains all sinks", () => {
          test.todo("deletes sink which was removed")
        })
      })
    })

    describe("#delete_sink", () => {
      test.todo("submits delete sink request")

      describe("success result", () => {
        test.todo("loads sinks")
      })

      describe("failed result", () => {
        test.todo("alerts error")
      })
    })
  })

  describe("#created", () => {
    describe("no_toggle is true", () => {
      test.todo("sets enable_email to true")
      test.todo("sets enable_sms to advanced_sinks")
      test.todo("sets enable_webhook to advanced_sinks")
    })

    test.todo("loads sinks")
  })
})
