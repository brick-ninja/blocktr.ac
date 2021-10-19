import {
  mount_vue,
  next_tick
} from './setup'

import Help from '../src/Help.vue'
import {breakpoints} from '../src/mq'

import ziti from '../src/config/ziti'

describe("Help Page", () => {
  let help;

  beforeEach(function() {
    help = mount_vue(Help)
  })

  describe("dom", () => {
    it("renders categories", async () => {
      await next_tick(help)
      const nav = help.findAll("#help_categories .list-group-item.help_category")
      expect(nav.length).toBe(help.vm.categories.length)

      for(var n = 0; n < nav.length; n += 1){
        expect(nav.at(n).find(".category_title").text()).toEqual(help.vm.categories[n])
      }
    })

    describe("category active", () => {
      it("sets active list-group-item", async() => {
        await next_tick(help)
        help.findAll("#help_categories .list-group-item.help_category").at(1).trigger("click")
        expect(help.vm.active).toBe(help.vm.categories[1]);
      })
    })

    describe("mq <= md", () => {
      let help;
      beforeEach(function() {
        global.innerWidth = breakpoints.md - 1;
        help = mount_vue(Help);
      })
      it("renders multiselect categories", () => {
        expect(help.get(".multiselect"))
      })

      describe("category active", () => {
        it("selects category", async () => {
          help.find("#help_categories .multiselect").trigger("click");
          help.findAll("#help_categories .multiselect .help_category").at(1).trigger("click");
          expect(help.vm.active).toBe(help.vm.categories[1]);
        })
      })
    })
    it("renders help topics' title and content", () => {
      expect(help.find("#help_topics .topic_title").text()).toBe(help.vm.topics[0].title);
    })
  })

  describe("computed", () => {
    describe("content", () => {
      it("maps icons and topics to categories", () => {
        let temp = Object.keys(help.vm.content);
        for(let category of temp){
          expect(help.vm.content[category]).toBeTruthy()
          expect(help.vm.content[category].icon).toBeTruthy()
          expect(help.vm.content[category].topics).toBeTruthy()
        }
      })
      it("interpolates ziti config", () => {
        help.setData({active: help.vm.categories[2]});
        expect(help.vm.topics[5].value).toContain(ziti.filter_match_history);
      })
    })

    describe("categories", () => {
      it("is help categories", () => {
        const help = mount_vue(Help)
        expect(help.vm.categories).toEqual(Object.keys(help.vm.content))
      })
    })

    describe("topics", () => {
      it("is active help topics", () => {
        const help = mount_vue(Help)
        help.setData({active : help.vm.categories[1]});
        expect(help.vm.topics).toEqual(help.vm.content[help.vm.active].topics)
      })
    })
  })

  describe("methods", () => {
    describe("#is_active", () => {
      describe("category is active", () => {
        it("is true", () => {
          const help = mount_vue(Help)
          expect(help.vm.is_active(help.vm.active)).toBe(true)
        })
      })

      describe("category is not active", () => {
        it("is false", () => {
          const help = mount_vue(Help)
          expect(help.vm.is_active("foobar")).toBe(false)
        })
      })
    })

    describe("#set_active", () => {
      it("sets active category", () => {
        help.vm.set_active(help.vm.categories[1]);
        expect(help.vm.active).toEqual(help.vm.categories[1])
      })
    })

    describe("#icon_for", () => {
      it("requires & returns icon for category", () => {
        const category = help.vm.categories[1];
        const icon = help.vm.content[category].icon;
        const path = '../src/assets/' + icon + '.svg';

        jest.doMock(path, () => {
          return path;
        })

        help = mount_vue(Help)
        expect(help.vm.icon_for(category)).toEqual(path)
      })
    })
  })

  describe("#created", () => {
    describe("category is specified", () => {
      it("sets active category from capitalized category", () => {
        const help1 = mount_vue(Help)
        const help2 = mount_vue(Help, {
          propsData : {
            category : help1.vm.categories[1].toLowerCase()
          }
        })
        expect(help2.vm.active).toEqual(help1.vm.categories[1])
      })

      describe("category is not valid", () => {
        it("does not set category", () => {
          const help = mount_vue(Help, {
            propsData : {
              category : 'foobar'
            }
          })

          expect(help.vm.active).toEqual(help.vm.categories[0])
        })
      })
    })

    describe("category is not specified", () => {
      it("does not set category", () => {
        const help = mount_vue(Help);
        expect(help.vm.active).toEqual(help.vm.categories[0])
      })
    })
  })
})
