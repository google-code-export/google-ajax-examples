var tokenizeJavaScript=(function(){function b(k,i){var l=false;var j;while(!k.endOfLine()){var j=k.next();if(j==i&&!l){return false}l=!l&&j=="\\"}return l}var c=function(){function i(p,o){return{type:p,style:"js-"+o}}var n=i("keyword a","keyword");var m=i("keyword b","keyword");var l=i("keyword c","keyword");var j=i("operator","keyword");var k=i("atom","atom");return{"if":n,"while":n,"with":n,"else":m,"do":m,"try":m,"finally":m,"return":l,"break":l,"continue":l,"new":l,"delete":l,"throw":l,"in":j,"typeof":j,"instanceof":j,"var":i("var","keyword"),"function":i("function","keyword"),"catch":i("catch","keyword"),"for":i("for","keyword"),"switch":i("switch","keyword"),"case":i("case","keyword"),"default":i("default","keyword"),"true":k,"false":k,"null":k,"undefined":k,"NaN":k,"Infinity":k}}();var e=matcher(/[+\-*&%\/=<>!?|]/);var a=matcher(/[0-9]/);var h=matcher(/[0-9A-Fa-f]/);var f=matcher(/[\w\$_]/);function d(i,j){return function(m,o){var k=i;var l=g(i,j,m,function(p){k=p});var n=l.type=="operator"||l.type=="keyword c"||l.type.match(/^[\[{}\(,;:]$/);if(n!=j||k!=i){o(d(k,n))}return l}}function g(n,o,j,k){function m(){j.next();j.nextWhile(h);return{type:"number",style:"js-atom"}}function r(){j.nextWhile(a);if(j.equals(".")){j.next();j.nextWhile(a)}if(j.equals("e")||j.equals("E")){j.next();if(j.equals("-")){j.next()}j.nextWhile(a)}return{type:"number",style:"js-atom"}}function q(){j.nextWhile(f);var v=j.get();var u=c.hasOwnProperty(v)&&c.propertyIsEnumerable(v)&&c[v];return u?{type:u.type,style:u.style,content:v}:{type:"variable",style:"js-variable",content:v}}function l(){b(j,"/");j.nextWhile(matcher(/[gi]/));return{type:"regexp",style:"js-string"}}function s(x){var v="/*";var u=(x=="*");while(true){if(j.endOfLine()){break}var w=j.next();if(w=="/"&&u){v=null;break}u=(w=="*")}k(v);return{type:"comment",style:"js-comment"}}function p(){j.nextWhile(e);return{type:"operator",style:"js-operator"}}function t(u){var v=b(j,u);k(v?u:null);return{type:"string",style:"js-string"}}if(n=='"'||n=="'"){return t(n)}var i=j.next();if(n=="/*"){return s(i)}else{if(i=='"'||i=="'"){return t(i)}else{if(/[\[\]{}\(\),;\:\.]/.test(i)){return{type:i,style:"js-punctuation"}}else{if(i=="0"&&(j.equals("x")||j.equals("X"))){return m()}else{if(a(i)){return r()}else{if(i=="/"){if(j.equals("*")){j.next();return s(i)}else{if(j.equals("/")){b(j,null);return{type:"comment",style:"js-comment"}}else{if(o){return l()}else{return p()}}}}else{if(e(i)){return p()}else{return q()}}}}}}}}return function(j,i){return tokenizer(j,i||d(false,true))}})();var JSParser=Editor.Parser=(function(){var b={atom:true,number:true,variable:true,string:true,regexp:true};function d(j,f,e,i,g,h){this.indented=j;this.column=f;this.type=e;if(i!=null){this.align=i}this.prev=g;this.info=h}function c(e){return function(g){var i=g&&g.charAt(0),h=e.type;var f=i==h;if(h=="vardef"){return e.indented+4}else{if(h=="form"&&i=="{"){return e.indented}else{if(h=="stat"||h=="form"){return e.indented+indentUnit}else{if(e.info=="switch"&&!f){return e.indented+(/^(?:case|default)\b/.test(g)?indentUnit:2*indentUnit)}else{if(e.align){return e.column-(f?1:0)}else{return e.indented+(f?0:indentUnit)}}}}}}}function a(g,I){var D=tokenizeJavaScript(g);var F=[n];var R=null;var x=new d((I||0)-indentUnit,0,"block",false);var M=0;var p=0;var y,l;var C={next:j,copy:Q};function j(){while(F[F.length-1].lex){F.pop()()}var S=D.next();if(S.type=="whitespace"&&M==0){p=S.value.length}M+=S.value.length;if(S.content=="\n"){p=M=0;if(!("align" in x)){x.align=false}S.indentation=c(x)}if(S.type=="whitespace"||S.type=="comment"){return S}if(!("align" in x)){x.align=true}while(true){y=l=false;F.pop()(S.type,S.content);if(y){if(l){S.style=l}else{if(S.type=="variable"&&z(S.content)){S.style="js-localvariable"}}return S}}}function Q(){var U=R,T=x,V=F.concat([]),S=D.state;return function W(X){R=U;x=T;F=V.concat([]);M=p=0;D=tokenizeJavaScript(X,S);return C}}function O(S){for(var T=S.length-1;T>=0;T--){F.push(S[T])}}function H(){O(arguments);y=true}function e(){O(arguments);y=false}function q(S){l=S}function w(){R={prev:R,vars:{"this":true,"arguments":true}}}function v(){R=R.prev}function r(S){if(R){q("js-variabledef");R.vars[S]=true}}function z(S){var T=R;while(T){if(T.vars[S]){return true}T=T.prev}return false}function o(T,U){var S=function(){x=new d(p,M,T,null,x,U)};S.lex=true;return S}function G(){x=x.prev}G.lex=true;function f(T){return function S(U){if(U==T){H()}else{H(arguments.callee)}}}function n(S){return e(B,n)}function B(S){if(S=="var"){H(o("vardef"),K,f(";"),G)}else{if(S=="keyword a"){H(o("form"),A,B,G)}else{if(S=="keyword b"){H(o("form"),B,G)}else{if(S=="{"){H(o("}"),s,G)}else{if(S=="function"){H(m)}else{if(S=="for"){H(o("form"),f("("),o(")"),k,f(")"),G,B,G)}else{if(S=="variable"){H(o("stat"),E)}else{if(S=="switch"){H(o("form"),A,o("}","switch"),f("{"),s,G,G)}else{if(S=="case"){H(A,f(":"))}else{if(S=="default"){H(f(":"))}else{if(S=="catch"){H(o("form"),w,f("("),u,f(")"),B,G,v)}else{e(o("stat"),A,f(";"),G)}}}}}}}}}}}}function A(S){if(b.hasOwnProperty(S)){H(L)}else{if(S=="function"){H(m)}else{if(S=="keyword c"){H(A)}else{if(S=="("){H(o(")"),A,f(")"),G,L)}else{if(S=="operator"){H(A)}else{if(S=="["){H(o("]"),N(A,"]"),G,L)}else{if(S=="{"){H(o("}"),N(t,"}"),G,L)}}}}}}}}function L(S){if(S=="operator"){H(A)}else{if(S=="("){H(o(")"),A,N(A,")"),G,L)}else{if(S=="."){H(P,L)}else{if(S=="["){H(o("]"),A,f("]"),G,L)}}}}}function E(S){if(S==":"){H(G,B)}else{e(L,f(";"),G)}}function P(S){if(S=="variable"){q("js-property");H()}}function t(S){if(S=="variable"){q("js-property")}if(b.hasOwnProperty(S)){H(f(":"),A)}}function N(U,S){function T(W){if(W==","){H(U,T)}else{if(W==S){H()}else{H(f(S))}}}return function V(W){if(W==S){H()}else{e(U,T)}}}function s(S){if(S=="}"){H()}else{e(B,s)}}function K(S,T){if(S=="variable"){r(T);H(J)}else{H()}}function J(S){if(S=="operator"){H(A,J)}else{if(S==","){H(K)}}}function k(S){if(S=="var"){H(K,i)}else{if(S==";"){e(i)}else{H(A,i)}}}function i(S){if(S==","){H(k)}else{if(S==";"){H(h)}else{H(A,f(";"),h)}}}function h(S){if(S==")"){e()}else{H(A)}}function m(S,T){if(S=="variable"){r(T);H(m)}else{if(S=="("){H(w,N(u,")"),B,v)}}}function u(S,T){if(S=="variable"){r(T);H()}}return C}return{make:a,electricChars:"{}:"}})();