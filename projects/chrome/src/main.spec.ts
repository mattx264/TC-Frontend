import { BrowserActionMonitor } from "./browserActionMonitor";
import { XpathHelper } from "./xpathHelper";
import { Main } from "./main";
var events = require('events');

describe('Main', () => {
  let main: Main;
  beforeEach(() => {
    
    var fixture = '<div id="fixture"><input id="x" type="text">' +
      '<input id="y" type="text">' +
      '<input id="add" type="button" value="Add Numbers">' +
      'Result: <span id="result" /></div>';
    document.body.insertAdjacentHTML(
      'afterbegin',
      fixture);

    (global as any).chrome = {
      runtime: {
        onMessage: {
          hasListener: function () { },
          addListener: function (e) { console.log(e) }
        },
        sendMessage: function () { }
      }
    };
    if (main == null) {
      main = new Main();
    } else {
      main.actionLog = [];
    }
    main.startBrowserActionMonitor();

  });
  afterEach(function () {
    document.body.removeChild(document.getElementById('fixture'));
  });

  it('should append last value', () => {
    (document.getElementById('x') as any).focus();
    keyPress("F");
    expect(main.actionLog[0].type).toBe("insert");
    expect(main.actionLog[0].data.action).toBe("sendKeys");
    expect(main.actionLog[0].data.value).toBe("F");
    keyPress("O");
    expect(main.actionLog[1].type).toBe("appendLastValue");
    expect(main.actionLog[1].data.action).toBe("sendKeys");
    expect(main.actionLog[1].data.value).toBe("O");

    // now change field

    (document.getElementById('y') as any).focus();

    keyPress("D");
    expect(main.actionLog[2].type).toBe("insert");
    expect(main.actionLog[2].data.action).toBe("sendKeys");
    expect(main.actionLog[2].data.value).toBe("D");
    keyPress("E");
    expect(main.actionLog[3].type).toBe("appendLastValue");
    expect(main.actionLog[3].data.action).toBe("sendKeys");
    expect(main.actionLog[3].data.value).toBe("E");

  });

  it('should backspace', () => {
    (document.getElementById('x') as any).focus();
    keyPress("F");
    expect(main.actionLog[0].type).toBe("insert");
    expect(main.actionLog[0].data.value).toBe("F");
    keyPress("BackSpace");
    expect(main.actionLog[1].type).toBe("insert");
    expect(main.actionLog[1].data.value).toBe("Keys.BACKSPACE");
    keyPress("D");
    expect(main.actionLog[2].type).toBe("insert");
    expect(main.actionLog[2].data.value).toBe("D");
    keyPress("A");
    expect(main.actionLog[3].type).toBe("appendLastValue");
    expect(main.actionLog[3].data.value).toBe("A");
  });

  function keyPress(key: string) {
    var event = document.createEvent('Event') as any;
    event.keyCode = key; // Deprecated, prefer .key instead.
    event.key = key;
    event.code = key;
    event.initEvent('keydown');
    document.dispatchEvent(event);
    event.initEvent('keyup');
    document.dispatchEvent(event);

  }
});
