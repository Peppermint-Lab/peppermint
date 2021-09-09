(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[19],{359:function(e,t,s){"use strict";t.a=s.p+"static/media/server_down.532ea75d.svg"},427:function(e,t,s){"use strict";s.r(t);s(0);var c=s(3),i=s.n(c),a=s(6),l=s(61),r=s(423),n=s(371),x=s(359),d=s(5),m=function(){var e=Object(a.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/v1/tickets/openedTickets");case 2:return t=e.sent,e.abrupt("return",t.json());case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(e){return Object(d.jsx)("div",{className:"overflow-x-auto md:-mx-6 lg:-mx-8",children:Object(d.jsx)("div",{className:"py-2 align-middle inline-block min-w-full md:px-6 lg:px-8",children:Object(d.jsx)("div",{className:"shadow overflow-hidden border-b border-gray-200 md:rounded-lg",children:Object(d.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[Object(d.jsx)("thead",{className:"bg-gray-50",children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"ID"}),Object(d.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Name"}),Object(d.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Client"}),Object(d.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Priority"}),Object(d.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Issue"}),Object(d.jsx)("th",{scope:"col",className:"relative px-6 py-3",children:Object(d.jsx)("span",{className:"sr-only",children:"Edit"})})]})}),Object(d.jsx)("tbody",{children:e.tickets.map((function(e){var t,s=e.priority;return"Low"===s&&(t="bg-blue-100 text-blue-800"),"Normal"===s&&(t="bg-green-100 text-green-800"),"High"===s&&(t="bg-red-100 text-red-800"),Object(d.jsxs)("tr",{className:"bg-white",children:[Object(d.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",children:e.id}),Object(d.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",children:e.name}),Object(d.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-900",children:e.client.name}),Object(d.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-900",children:Object(d.jsx)("span",{className:"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(t),children:e.priority})}),Object(d.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-900",children:e.issue}),Object(d.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:Object(d.jsx)(l.b,{to:{pathname:"tickets/".concat(e.id),state:e},className:"text-indigo-600 hover:text-indigo-900",children:"view"})})]},e.id)}))})]})})})})},o=function(e){return Object(d.jsx)("div",{className:"overflow-x-auto md:-mx-6 lg:-mx-8 mt-10",children:Object(d.jsx)("div",{className:"py-2 align-middle inline-block min-w-full md:px-6 lg:px-8",children:Object(d.jsx)("div",{className:"overflow-hidden md:rounded-lg",children:e.tickets.map((function(e){var t,s=e.priority;return"Low"===s&&(t="bg-blue-100 text-blue-800"),"Normal"===s&&(t="bg-green-100 text-green-800"),"High"===s&&(t="bg-red-100 text-red-800"),Object(d.jsx)("div",{className:"flex justify-start",children:Object(d.jsx)("div",{className:"w-full mb-2 border",children:Object(d.jsxs)("div",{className:"px-4 py-4",children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("h1",{className:"font-semibold leading-tight text-2xl text-gray-800 hover:text-gray-800 ml-1",children:e.name}),Object(d.jsxs)("p",{className:" px-2",children:["Client: ",e.client.name]})]}),Object(d.jsx)("span",{className:"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(t),children:e.priority}),Object(d.jsx)("p",{className:"text-gray-900 m-2",children:e.issue}),Object(d.jsx)("div",{className:"text-gray-700 text-sm font-bold p-2 m-2",children:Object(d.jsx)(l.b,{to:{pathname:"tickets/".concat(e.id),state:e},className:"float-right",children:"View Full Ticket"})})]})})},e.id)}))})})})},p=function(){var e=Object(r.a)("fetchTickets",m),t=e.data,s=e.status;return console.log(t),Object(d.jsxs)("div",{className:"flex flex-col",children:["loading"===s&&Object(d.jsxs)("div",{className:"min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8",children:[Object(d.jsx)("h2",{children:" Loading data ... "}),Object(d.jsx)(n.a,{})]}),"error"===s&&Object(d.jsxs)("div",{className:"min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8",children:[Object(d.jsx)("h2",{className:"text-2xl font-bold",children:" Error fetching data ... "}),Object(d.jsx)("img",{src:x.a,className:"h-96 w-96",alt:"error"})]}),"success"===s&&Object(d.jsx)("div",{children:0===t.tickets.length?Object(d.jsx)("div",{className:"min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8",children:Object(d.jsx)("p",{children:"No tickets have been created"})}):Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:"hidden sm:block",children:Object(d.jsx)(j,{tickets:t.tickets})}),Object(d.jsx)("div",{className:"sm:hidden",children:Object(d.jsx)(o,{tickets:t.tickets})})]},t.tickets.id)})]})};t.default=function(){return Object(d.jsxs)("div",{className:"max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-10 flex flex-col",children:[Object(d.jsx)("div",{className:"sm:px-6 md:px-8 ml-2",children:Object(d.jsx)("div",{className:"flex flex-row",children:Object(d.jsx)("h1",{className:"text-2xl font-semibold text-gray-900",children:"Open Ticket"})})}),Object(d.jsx)("div",{children:Object(d.jsx)(p,{})})]})}}}]);
//# sourceMappingURL=19.1205d257.chunk.js.map