/*
 * Helper module defining some computed properties to infer
 * page based on route (url). Used by a few components to
 * determine subcomponents to render.
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */

export default {
  computed : {
    is_filter_page : function(){
      return this.$route.path.split("/")[1] == "filter";
    },

    is_test_page : function(){
      return this.$route.path.split("/")[1] == "test";
    }
  }
}
