<!--
  * JSONPath help Page
  * Explains jsonpath syntax
  *
  * Copyright (c) 2020-2021 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="jsonpath">
    <div id="jsonpath">
      <h1 id="jsonpath_title">JSONPath</h1>

      <div id="jsonpath_content">
        <h3 id="syntax">Syntax</h3>

        <p>The following is a brief overview of the JSONPath expression syntax.</p>

        <p>
          In JSONPath expressions the <b>$</b> represents to the top level object.
        <p>

         <p>
           Expressions can use <b>dot-notation</b> (<i>{{blockchain_jsonpath_dot_notation_example}}</i>)
           or <b>bracket-notation</b> (<i>{{blockchain_jsonpath_bracket_notation_example}}</i>)
           for input paths.
         </p>

         <p>
           JSONPath allows the wildcard symbol <b>*</b> for member names and array indices.
         </p>

         <p v-if="!!blockchain_jsonpath_script_expression_example">
           <b>Script expressions</b> can be used as an alternative to explicit names or indices as in: <i>{{blockchain_jsonpath_script_expression_example}}</i>,
           using the symbol <b>@</b> for the current object.
         </p>

         <p v-if="!!blockchain_jsonpath_filter_expression_example">
           Filter expressions are supported via the syntax <b>?(&lt;boolean expr&gt;)</b> as in: <i>{{blockchain_jsonpath_filter_expression_example}}</i>
         </p>

        <h3 id="structure">Structure</h3>

         <p>
           Here is a complete overview of the JSONPath syntax elements:
         </p>

         <table>
         <tr>
           <th>JSONPath</th><th>Description</th>
         </tr>

         <tr>
         <td>$</td><td>The root object/element</td>
         </tr>

         <tr>
         <td>@</td><td>The current object/element</td>
         </tr>

         <tr>
         <td>. or []</td><td>Child operator</td>
         </tr>

         <tr>
         <td>..</td><td>Recursive descent.</td>
         </tr>

         <tr>
         <td>*</td><td>Wildcard. All objects/elements regardless their names.</td>
         </tr>

         <tr>
         <td>[]</td><td>Subscript operator. In Javascript and JSON it is the native array operator.</td>
         </tr>

         <tr>
         <td>[,]</td><td>Union operator in JSONPath allows alternate names or array indices as a set.</td>
         </tr>

         <tr>
         <td>[start:end:step]</td><td>Array slice operator</td>
         </tr>

         <tr>
         <td>?()</td><td>Applies a filter (script) expression.</td>
         </tr>

         <tr>
         <td>()</td><td>Script expression, using the underlying script engine.</td>
         </tr>
         </table>

         <br/>

         <h3 id="example">JSONPath example</h3>

         <p>
         The following is a transaction from the {{active_blockchain_upper}} transaction stream
         </p>

         <b-alert show variant="warning" id="top_level_wrapper_note">
           Before processing, {{app_name}} wraps all {{active_blockchain_upper}} transactions in the following top level object:

           <br v-if="mq_xs" />

           <span id="transaction_wrapper_text">
             <b>{ transaction : &lt;actual transaction&gt; }</b>
           </span>
         </b-alert>

         <renderjson :data="blockchain_example_transaction" level="4" />

         <table id="example_table">
         <tr>
           <th>JSONPath</th><th>Result</th>
         </tr>

         <tr v-for="example in blockchain_jsonpath_help_examples"
              :key="example.id">
           <td v-html="example.syntax"></td>
           <td v-html="example.description"></td>
         </tr>

         <tr>
           <td>$..*</td><td>All members of the JSON structure.</td>
         </tr>
        </table>

        <br/>

        <h3 id="gotchyas">Common Gotchyas</h3>

        <ul>
          <li>{{app_name}} wraps transactions in a top level <b>transaction</b> object. Make sure to incoporate this into your JSONPath expression and/or use the recursive descent operator: <b>..</b></li>
          <li v-if="xrp_active">Transactions returned by a XRPL server are in different formats depending on context. Transactions which are sent to clients in the <b>transaction stream</b> have <b>transaction</b> and <b>meta</b> objects (see the example above) whereas those returned by the <a href="https://xrpl.org/tx.html#response-format"><b>tx command</b></a> embed the <b>meta</b> object <b>and</b> transaction fields in a top level <b>result</b> object. <b>Zerp tracker runs filter expressions against transaction stream transcations</b></li>
          <li v-if="xlm_active">Before being processed, all XLM transactions are transformed using the <a href="https://www.npmjs.com/package/ezxlm">EZ XLM library</a>. This faciliates higher throughput for improved performance but results in a different structure than stock XLM transactions. See that library for details on the transformation process and the new structure which transactions are transformed into.</li>
          <li>Make sure to check for typos and structural inconsistencies against actual {{active_blockchain_upper}} data</li>
        </ul>

        <h3 id="testing">Testing Expressions</h3>

        <p>
        On the <router-link to="/txs">Live Transactions</router-link> page you can build and test JSONPath expressions which are evaluated in real-time against the live transaction stream. Once you have an expression that meets your criteria, click the <b>Save Filter</b> button to be notified of matches.
        </p>

        <p>
        Saved filter expressions can be tested against a variety of pre-captured transactions by navigating to the <b>Filter Details Page</b> and clicking <b>Test Filter</b>.
        </p>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout'
import Blockchain from './mixins/blockchain'
import renderjson from './vendor/renderjson/renderjson.vue'

export default {
  name: 'JSONPath',

  mixins : [Blockchain],

  components: {
    MainLayout,
    renderjson
  }
}
</script>

<style scoped>
#jsonpath{
  margin-bottom: 25px;
  padding: 5px;
  padding-top: 25px;
}

#jsonpath_title{
  font-family: var(--theme-font3);
  font-weight: bold;
}

#jsonpath_content{
  padding: 25px;
  border: 1px solid #ededed;
  border-radius: 5px;
  background-color: white;
  font-family: var(--theme-font1);
}

#main_layout.md #jsonpath_content,
#main_layout.sm #jsonpath_content,
#main_layout.xs #jsonpath_content{
  padding: 10px;
}

table{
  width: 100%;
}

#main_layout.sm table,
#main_layout.xs table{
  word-break: break-word;
}

tr{
  border: 1px solid black;
}

th, td{
  padding: 5px;
}

#top_level_wrapper_note{
  font-size: 1.1rem;
}

#main_layout.xs #top_level_wrapper_note{
  font-size: 0.8rem;
}

#transaction_wrapper_text{
  white-space: pre;
}

#main_layout.xs #transaction_wrapper_text{
  white-space: unset;
}
</style>
