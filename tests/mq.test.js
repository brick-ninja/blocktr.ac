import {
  shallow_mount_vue,
  next_tick
} from './setup'

import {breakpoints} from '../src/mq'

const mqs = Object.keys(breakpoints)

const Component = {
  render() {}
}

describe("mq", () => {
  for(var mqi = 0; mqi < mqs.length; mqi += 1){
    const mq = mqs[mqi]

    describe("mq_" + mq, () => {
      const boundry = breakpoints[mq];

      describe("mq == " + mq, () => {
        it("is true", async () => {
          global.innerWidth = boundry - 1;
          var component = shallow_mount_vue(Component)
          await next_tick(component)
          expect(component.vm['mq_' + mq]).toBe(true);
        })
      })

      if(boundry != Infinity){
        describe("mq != " + mq, () => {
          it("is false", async () => {
            global.innerWidth = boundry + 1;
            var component = shallow_mount_vue(Component)
            await next_tick(component)
            expect(component.vm['mq_' + mq]).toBe(false);
          })
        })
      }
    })

    if(mqi != 0){
      describe("mq_lt_" + mq, () => {
        describe("mq < " + mq, () => {
          const boundry = breakpoints[mqs[mqi-1]];

          it("is true", async () => {
            global.innerWidth = boundry - 1;

            var component = shallow_mount_vue(Component)
            await next_tick(component)
            expect(component.vm['mq_lt_' + mq]).toBe(true);
          })
        })

        describe("mq == " + mq, () => {
          const boundry = breakpoints[mq];

          it("is false", async () => {
            global.innerWidth = boundry - 1;

            var component = shallow_mount_vue(Component)
            await next_tick(component)
            expect(component.vm['mq_lt_' + mq]).toBe(false);
          })
        })

        if(mqi != mqs.length - 1){
          describe("mq > " + mq, () => {
            const boundry = breakpoints[mqs[mqi+1]];

            it("is false", async () => {
              global.innerWidth = boundry - 1;

              var component = shallow_mount_vue(Component)
              await next_tick(component)
              expect(component.vm['mq_lt_' + mq]).toBe(false);
            })
          })
        }
      })

      if(mqi != mqs.length - 1){
        describe("mq_lte_" + mq, () => {
          describe("mq < " + mq, () => {
            const boundry = breakpoints[mqs[mqi-1]];

            it("is true", async () => {
              global.innerWidth = boundry - 1;

              var component = shallow_mount_vue(Component)
              await next_tick(component)
              expect(component.vm['mq_lte_' + mq]).toBe(true);
            })
          })

          describe("mq == " + mq, () => {
            const boundry = breakpoints[mq];

            it("is true", async () => {
              global.innerWidth = boundry - 1;

              var component = shallow_mount_vue(Component)
              await next_tick(component)
              expect(component.vm['mq_lte_' + mq]).toBe(true);
            })
          })

          describe("mq > " + mq, () => {
            const boundry = breakpoints[mqs[mqi+1]];
            it("is false", async () => {
              global.innerWidth = boundry - 1;

              var component = shallow_mount_vue(Component)
              await next_tick(component)
              expect(component.vm['mq_lte_' + mq]).toBe(false);
            })
          })
        })
      }
    }

    if(mqi != mqs.length - 1){
      describe("mq_gt_" + mq, () => {
        if(mqi != 0){
          describe("mq < " + mq, () => {
            const boundry = breakpoints[mqs[mqi-1]];

            it("is false", async () => {
              global.innerWidth = boundry - 1;

              var component = shallow_mount_vue(Component)
              await next_tick(component)
              expect(component.vm['mq_gt_' + mq]).toBe(false);
            })
          })
        }

        describe("mq == " + mq, () => {
          const boundry = breakpoints[mq];

          it("is false", async () => {
            global.innerWidth = boundry - 1;

            var component = shallow_mount_vue(Component)
            await next_tick(component)
            expect(component.vm['mq_gt_' + mq]).toBe(false);
          })
        })

        describe("mq > " + mq, () => {
          const boundry = breakpoints[mqs[mqi+1]];

          it("is true", async () => {
            global.innerWidth = boundry - 1;

            var component = shallow_mount_vue(Component)
            await next_tick(component)
            expect(component.vm['mq_gt_' + mq]).toBe(true);
          })
        })
      })

      if(mqi != 0){
        describe("mq_gte_" + mq, () => {
          describe("mq < " + mq, () => {
            const boundry = breakpoints[mqs[mqi-1]];

            it("is false", async () => {
              global.innerWidth = boundry - 1;

              var component = shallow_mount_vue(Component)
              await next_tick(component)
              expect(component.vm['mq_gte_' + mq]).toBe(false);
            })
          })

          describe("mq == " + mq, () => {
            const boundry = breakpoints[mq];

            it("is true", async () => {
              global.innerWidth = boundry - 1;

              var component = shallow_mount_vue(Component)
              await next_tick(component)
              expect(component.vm['mq_gte_' + mq]).toBe(true);
            })
          })

          describe("mq > " + mq, () => {
            const boundry = breakpoints[mqs[mqi+1]];

            it("is true", async () => {
              global.innerWidth = boundry - 1;

              var component = shallow_mount_vue(Component)
              await next_tick(component)
              expect(component.vm['mq_gte_' + mq]).toBe(true);
            })
          })
        })
      }
    }
  }
})
