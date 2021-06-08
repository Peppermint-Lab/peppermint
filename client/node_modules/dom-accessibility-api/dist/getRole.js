"use strict";

exports.__esModule = true;
exports.default = getRole;

var _util = require("./util");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var localNameToRoleMappings = {
  article: "article",
  aside: "complementary",
  body: "document",
  button: "button",
  datalist: "listbox",
  dd: "definition",
  details: "group",
  dialog: "dialog",
  dt: "term",
  fieldset: "group",
  figure: "figure",
  // WARNING: Only with an accessible name
  form: "form",
  footer: "contentinfo",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  h5: "heading",
  h6: "heading",
  header: "banner",
  hr: "separator",
  legend: "legend",
  li: "listitem",
  math: "math",
  main: "main",
  menu: "list",
  nav: "navigation",
  ol: "list",
  optgroup: "group",
  // WARNING: Only in certain context
  option: "option",
  output: "status",
  progress: "progressbar",
  // WARNING: Only with an accessible name
  section: "region",
  summary: "button",
  table: "table",
  tbody: "rowgroup",
  textarea: "textbox",
  tfoot: "rowgroup",
  // WARNING: Only in certain context
  td: "cell",
  th: "columnheader",
  thead: "rowgroup",
  tr: "row",
  ul: "list"
};
var prohibitedAttributes = {
  caption: new Set(["aria-label", "aria-labelledby"]),
  code: new Set(["aria-label", "aria-labelledby"]),
  deletion: new Set(["aria-label", "aria-labelledby"]),
  emphasis: new Set(["aria-label", "aria-labelledby"]),
  generic: new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
  insertion: new Set(["aria-label", "aria-labelledby"]),
  paragraph: new Set(["aria-label", "aria-labelledby"]),
  presentation: new Set(["aria-label", "aria-labelledby"]),
  strong: new Set(["aria-label", "aria-labelledby"]),
  subscript: new Set(["aria-label", "aria-labelledby"]),
  superscript: new Set(["aria-label", "aria-labelledby"])
};
/**
 *
 * @param element
 * @param role The role used for this element. This is specified to control whether you want to use the implicit or explicit role.
 */

function hasGlobalAriaAttributes(element, role) {
  // https://rawgit.com/w3c/aria/stable/#global_states
  // commented attributes are deprecated
  return ["aria-atomic", "aria-busy", "aria-controls", "aria-current", "aria-describedby", "aria-details", // "disabled",
  "aria-dropeffect", // "errormessage",
  "aria-flowto", "aria-grabbed", // "haspopup",
  "aria-hidden", // "invalid",
  "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-live", "aria-owns", "aria-relevant", "aria-roledescription"].some(function (attributeName) {
    var _prohibitedAttributes;

    return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role]) === null || _prohibitedAttributes === void 0 ? void 0 : _prohibitedAttributes.has(attributeName));
  });
}

function ignorePresentationalRole(element, implicitRole) {
  // https://rawgit.com/w3c/aria/stable/#conflict_resolution_presentation_none
  return hasGlobalAriaAttributes(element, implicitRole);
}

function getRole(element) {
  var explicitRole = getExplicitRole(element);

  if (explicitRole === null || explicitRole === "presentation") {
    var implicitRole = getImplicitRole(element);

    if (explicitRole !== "presentation" || ignorePresentationalRole(element, implicitRole || "")) {
      return implicitRole;
    }
  }

  return explicitRole;
}

function getImplicitRole(element) {
  var mappedByTag = localNameToRoleMappings[(0, _util.getLocalName)(element)];

  if (mappedByTag !== undefined) {
    return mappedByTag;
  }

  switch ((0, _util.getLocalName)(element)) {
    case "a":
    case "area":
    case "link":
      if (element.hasAttribute("href")) {
        return "link";
      }

      break;

    case "img":
      if (element.getAttribute("alt") === "" && !ignorePresentationalRole(element, "img")) {
        return "presentation";
      }

      return "img";

    case "input":
      {
        var _ref = element,
            type = _ref.type;

        switch (type) {
          case "button":
          case "image":
          case "reset":
          case "submit":
            return "button";

          case "checkbox":
          case "radio":
            return type;

          case "range":
            return "slider";

          case "email":
          case "tel":
          case "text":
          case "url":
            if (element.hasAttribute("list")) {
              return "combobox";
            }

            return "textbox";

          case "search":
            if (element.hasAttribute("list")) {
              return "combobox";
            }

            return "searchbox";

          default:
            return null;
        }
      }

    case "select":
      if (element.hasAttribute("multiple") || element.size > 1) {
        return "listbox";
      }

      return "combobox";
  }

  return null;
}

function getExplicitRole(element) {
  if (element.hasAttribute("role")) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe due to hasAttribute check
    var _trim$split = element.getAttribute("role").trim().split(" "),
        _trim$split2 = _slicedToArray(_trim$split, 1),
        explicitRole = _trim$split2[0];

    if (explicitRole !== undefined && explicitRole.length > 0) {
      return explicitRole;
    }
  }

  return null;
}
//# sourceMappingURL=getRole.js.map