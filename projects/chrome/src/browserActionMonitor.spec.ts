// import { BrowserActionMonitor } from "./browserActionMonitor";
// import { XpathHelper } from "./xpathHelper";

// describe('BrowserActionMonitor', () => {
//   let messages: any[];
//   let browserActionMonitor: BrowserActionMonitor;
//   beforeEach(() => {
//     document.onkeyup = null;
//     document.onkeydown = null;
//     document.ondblclick = null;
//     document.onmousedown = null;

//     var fixture = '<div id="fixture"><input id="x" type="text">' +
//       '<input id="y" type="text">' +
//       '<input id="add" type="button" value="Add Numbers">' +
//       'Result: <span id="result" /></div>';
//     document.body.insertAdjacentHTML(
//       'afterbegin',
//       fixture);

//     var xpathHelper = new XpathHelper();
//     messages = [];
//     browserActionMonitor = new BrowserActionMonitor(xpathHelper, (e) => {
//       messages.push(e);
//     });
//   });
//   afterEach(function () {
//     document.body.removeChild(document.getElementById('fixture'));
//     messages = [];
//   });
//   // it('should create', () => {
//   //   const event = new KeyboardEvent("keypress", {
//   //     "key": "A"
//   //   });

//   //   browserActionMonitor.addKeyUpEventListener(event);
//   // }); 
//   // it('addDoubleClickEventListener', () => {
//   //   const event = new MouseEvent("keypress", {
//   //   });

//   //   browserActionMonitor.addDoubleClickEventListener(event);
//   // });
//   it('should ', () => {
//     (document.getElementById('x') as any).focus();
//     let event = new KeyboardEvent("keypress", {
//       "key": "A"
//     });
//     browserActionMonitor.addKeyUpEventListener(event);
//     expect(messages.length).toBe(1);
//     event = new KeyboardEvent("keypress", {
//       "key": "B"
//     });
//     browserActionMonitor.addKeyUpEventListener(event);
//     expect(messages.length).toBe(2);

//   });
// });
