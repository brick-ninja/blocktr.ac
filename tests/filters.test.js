import {shallow_mount_vue} from './setup'

const Component = {
  template :
    `<div>
       <div id='delim'>{{1234567890 | delim}}</div>
       <div id='round'>{{123.456789 | round(3)}}</div>
       <div id='abbrev'>{{123467890 | abbrev}}</div>
       <div id='ellipsis1'>{{'abcdefg' | ellipsis}}</div>
       <div id='ellipsis2'>{{'abcdefg' | ellipsis(10)}}</div>
       <div id='ellipsis3'>{{'abcdefg' | ellipsis(5)}}</div>
     </div>`
}

describe("vue filters", () => {
  var component;

  beforeEach(function(){
    component = shallow_mount_vue(Component)
  })

  describe("delim", () => {
    it("is deliminated value", () => {
      expect(component.find("#delim").text()).toEqual("1,234,567,890")
    })
  })

  describe("round", () => {
    it("is rounded value", () => {
      expect(component.find("#round").text()).toEqual("123.457")
    })
  })

  describe("abbrev", () => {
    it("is abbreviated value", () => {
      expect(component.find("#abbrev").text()).toEqual("123.47M")
    })
  })

  describe("ellipsis", () => {
    describe("no length specified", () => {
      it("is value", () => {
        expect(component.find("#ellipsis1").text()).toEqual("abcdefg")
      })
    })

    describe("value length <= length", () => {
      it("is value", () => {
        expect(component.find("#ellipsis2").text()).toEqual("abcdefg")
      })
    })

    it("trunactes value and applies ellipsis", () => {
      expect(component.find("#ellipsis3").text()).toEqual("abcde...")
    })
  })
})
