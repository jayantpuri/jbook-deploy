(self.webpackChunk_react_code_notes_client=self.webpackChunk_react_code_notes_client||[]).push([[16294],{16294:function(){!function(e){e.languages.etlua={delimiter:{pattern:/^<%[-=]?|-?%>$/,alias:"punctuation"},"language-lua":{pattern:/[\s\S]+/,inside:e.languages.lua}},e.hooks.add("before-tokenize",(function(a){e.languages["markup-templating"].buildPlaceholders(a,"etlua",/<%[\s\S]+?%>/g)})),e.hooks.add("after-tokenize",(function(a){e.languages["markup-templating"].tokenizePlaceholders(a,"etlua")}))}(Prism)}}]);
//# sourceMappingURL=16294.bf2a27ba.chunk.js.map