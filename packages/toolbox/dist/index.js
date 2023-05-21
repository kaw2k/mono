"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var toolbox_exports = {};
__export(toolbox_exports, {
  Id: () => Id,
  sample: () => sample,
  shuffle: () => shuffle,
  text: () => text
});
module.exports = __toCommonJS(toolbox_exports);

// types/id.ts
var rand = () => Math.round(Math.random() * 1e7).toString();
var Id = (val) => val || [rand(), rand(), rand(), rand()].join("-");

// helpers/shuffle.ts
var shuffle = (originalArray) => {
  let array = originalArray.slice(0);
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

// helpers/text.ts
function rand2(max) {
  return Math.max(1, Math.ceil(Math.random() * (max || 1e8)));
}
function text(type, size) {
  if (type === "word") {
    return shuffle(words).slice(0, size || rand2(3)).join(" ").trim();
  }
  if (type === "sentence") {
    return shuffle(sentences).slice(0, size || rand2(6)).join(". ").trim();
  }
  if (type === "paragraph") {
    let ret = [];
    for (let i = 0; i < (size || rand2(2)); i++) {
      ret = ret.concat(text("sentence"));
    }
    return ret.join("\n\n").trim();
  }
  return "";
}
var src = "Habitasse montes elementum vulputate dictumst semper primis arcu lacus sagittis, quis maecenas integer mollis penatibus volutpat convallis mattis fringilla, per pellentesque mi ante hendrerit posuere nunc lobortis. Suscipit auctor fermentum adipiscing primis eros elit ad augue, porttitor pellentesque condimentum varius dignissim lectus sem eleifend, iaculis libero nisl pulvinar aptent potenti risus. Nec pulvinar hac leo venenatis inceptos arcu turpis conubia dolor finibus magna, facilisi cursus est per tellus vehicula consectetur dictumst nascetur. Commodo libero ac parturient posuere tortor justo mus vel rutrum, lobortis montes elementum sapien condimentum interdum lectus morbi volutpat, aenean porta netus facilisi vehicula nulla ipsum congue. Quam amet vitae lacinia phasellus integer turpis nec vel felis, himenaeos sem a habitasse porttitor hac gravida varius tellus velit, maximus suspendisse finibus pretium diam metus efficitur vehicula. Potenti maecenas tristique ultrices donec tincidunt et elit platea ac, proin nam aptent fringilla cras nibh eros viverra hendrerit, mattis ad convallis est dis semper rutrum netus. Non habitant purus est nostra ridiculus proin congue dapibus, primis dictumst diam facilisis massa finibus maecenas lacinia, arcu sem per felis dignissim sodales libero. Feugiat a fusce cursus elementum sapien rutrum aliquet, mus vulputate maximus lorem morbi montes nullam, condimentum congue ullamcorper sem himenaeos venenatis. Phasellus dis sapien dictum blandit vel vehicula, eget suspendisse lobortis lacinia rutrum velit primis, elit justo litora diam amet. Dictum convallis lacinia magnis dictumst montes morbi potenti, molestie ornare dis dolor pellentesque justo, cursus ex tristique penatibus cras quis. Donec penatibus erat posuere morbi et blandit tortor habitasse, egestas ipsum maecenas dui ultricies imperdiet sem. Ultricies sit dictum porta suscipit vehicula ipsum praesent ullamcorper hendrerit, libero adipiscing pharetra ornare class himenaeos in tristique, nam orci purus risus facilisis suspendisse ad erat. Erat dictum tellus feugiat volutpat fermentum litora sociosqu class, montes magnis eu euismod nulla tempor convallis maecenas malesuada, accumsan et porttitor ante eros quisque magna. Metus tortor consequat sodales hendrerit placerat malesuada enim facilisis molestie accumsan, est felis elementum rhoncus eros in elit maximus litora commodo, magnis maecenas pellentesque tristique tempus vulputate diam vehicula et. Lobortis integer gravida aptent maximus est tortor lectus vivamus dis, condimentum inceptos pellentesque ac odio lacus adipiscing eleifend primis, euismod non placerat facilisi mi erat porttitor tristique. Luctus class aliquet metus porttitor vulputate a maecenas felis purus neque diam, magnis viverra placerat nostra himenaeos pretium montes facilisi sem ultrices potenti, sit fames habitasse semper parturient aenean est convallis morbi id. Conubia odio congue nullam duis facilisi ac sollicitudin tortor lobortis mollis praesent, volutpat sem parturient lorem libero torquent maecenas non pharetra etiam natoque, sociosqu purus amet tempus himenaeos taciti curae mus porttitor at. Odio volutpat litora pulvinar placerat cursus suscipit adipiscing semper sodales, purus dolor leo donec cras in primis erat ridiculus, parturient ex aptent pellentesque ipsum iaculis tempor sagittis. Imperdiet hendrerit per felis ante nunc a tortor integer, tincidunt ut sit luctus nam himenaeos at, posuere conubia gravida penatibus ultricies proin vivamus. Nulla hac per ipsum nisl morbi neque porttitor vitae, adipiscing hendrerit orci inceptos habitasse quam varius quis magnis, senectus tempus amet sed rutrum consequat ac. Duis aliquet lacinia dis et litora lacus porttitor quam, bibendum dolor tempor risus inceptos ullamcorper efficitur, eget hac nec sem netus faucibus ante. Enim natoque litora dis quam sagittis sodales tempus hac donec sed, magnis finibus sapien integer ad posuere ante facilisis. Nam mauris inceptos platea semper fusce scelerisque mus, hac habitasse ultricies congue sed porta vehicula ut, tristique torquent sapien nulla metus sociosqu. Hac dictum ut nunc taciti ultricies fringilla efficitur, a blandit sit euismod dapibus facilisis laoreet, elit viverra libero cubilia ligula aenean. Nisi massa mus eleifend scelerisque tellus a malesuada phasellus, posuere mollis purus pretium hac vulputate eu, tortor velit suspendisse ultricies montes sollicitudin morbi. Ad purus fusce habitant accumsan neque leo consectetur phasellus aenean, suspendisse nostra tristique libero duis lobortis quis finibus. Magnis donec sapien ligula litora leo senectus sociosqu maecenas, velit cursus imperdiet iaculis justo ex platea, per molestie ut cubilia duis proin tempor. Eget dictum dictumst potenti ad luctus fermentum condimentum, rutrum facilisis laoreet eros magna tristique risus, vestibulum duis dignissim sem platea euismod. Dictum in taciti convallis amet morbi ultrices vehicula sagittis, volutpat adipiscing suscipit finibus egestas aenean arcu, mollis nam enim tincidunt justo duis phasellus. Elit faucibus gravida sit sem montes proin felis tempus etiam, ex sollicitudin hac integer hendrerit dictum nisi. Metus placerat class non donec ridiculus duis taciti magna, nibh maecenas habitasse pretium faucibus ac fusce dis, fames mollis tristique vulputate tempor sociosqu malesuada. Nullam iaculis tristique ridiculus varius mollis montes eget dapibus posuere nunc est metus, fames lacinia faucibus ullamcorper lacus blandit natoque penatibus massa euismod porta efficitur vehicula, curae hendrerit maximus ac habitant in magnis luctus id conubia fringilla. Consequat elit turpis fusce vel sagittis egestas inceptos luctus justo sem, aenean platea class magnis tortor tristique volutpat sit phasellus ligula mi, convallis efficitur nam duis congue mollis ut nostra odio. Eleifend vestibulum mauris auctor maecenas varius posuere nascetur metus suspendisse tristique, massa leo libero sollicitudin ac suscipit sodales donec condimentum. Potenti mus augue ipsum a tempus fames ullamcorper auctor, neque ornare et senectus cubilia porta tristique. Porttitor mus praesent enim gravida non etiam sem, euismod dis egestas arcu consectetur tincidunt, mollis massa eu tortor pharetra vitae. Rutrum ullamcorper enim convallis himenaeos pulvinar nostra cras viverra massa in aliquam lacinia parturient, aenean semper sociosqu vitae egestas adipiscing eros ex sem sed natoque. Et euismod nullam mattis hac primis ex non ridiculus phasellus, litora venenatis odio nibh integer blandit tellus id. Purus consectetur nunc maecenas vel efficitur vehicula, cras ligula maximus porttitor etiam dictumst eros, laoreet accumsan pharetra cursus mi. Curae pretium sollicitudin aenean vehicula habitant leo, conubia iaculis blandit mi finibus. Curabitur aenean gravida euismod ridiculus nostra montes id consequat lacinia varius, accumsan velit bibendum maximus dui cubilia nam integer rhoncus nunc lobortis, consectetur hendrerit dignissim aliquam ipsum adipiscing blandit eu rutrum. Velit interdum porta elit per habitasse condimentum eleifend nibh etiam, posuere penatibus purus integer nam tortor vestibulum quis ac, hac justo aptent et lectus non inceptos luctus. Semper rhoncus curabitur imperdiet pellentesque facilisis praesent nunc, fusce laoreet conubia porttitor dis mollis, dolor placerat vehicula ligula penatibus felis. Nullam enim habitasse semper primis, mollis congue praesent blandit, amet volutpat facilisis. Rutrum curabitur elementum etiam id consequat eleifend efficitur finibus quis tristique, quisque magna risus maximus dictum dictumst eros nulla. Integer senectus sodales odio eget et molestie in fermentum congue ad est per malesuada, ornare class bibendum vulputate lectus orci nisi auctor velit lorem egestas platea. Luctus lacus maximus faucibus venenatis ultrices odio donec mauris euismod phasellus volutpat congue, habitasse sed arcu nascetur ut dui consectetur facilisis vulputate tellus. Ornare efficitur nisi consectetur placerat fringilla elit fermentum conubia penatibus aliquam, elementum phasellus bibendum dis purus pellentesque cursus varius ut, dictum erat iaculis netus nibh suspendisse etiam mattis duis. Dolor nascetur adipiscing feugiat sed cubilia ut fusce diam gravida, natoque lacinia vestibulum efficitur netus libero blandit. Tristique mattis sem eleifend efficitur fringilla facilisis purus vehicula duis, est ridiculus leo sociosqu accumsan potenti ullamcorper curabitur ad etiam, placerat blandit molestie dis libero augue velit enim.";
var sentences = src.split(".");
var words = src.replace(/[^a-zA-Z\s]/g, "").split(" ");

// helpers/sample.ts
function sample(vals) {
  return vals[Math.floor(Math.random() * vals.length)];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Id,
  sample,
  shuffle,
  text
});
