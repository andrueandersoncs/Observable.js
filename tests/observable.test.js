import Observable from '../lib/observable';

describe('validateTypeHandler', () => {
  it('rejects types that are not strings', () => {
    const o = new Observable();
    expect(() => {
      o.validateTypeHandler({ hello: 'darkness my old friend' }, function() {});
    }).toThrow();
  });

  it('rejects handlers that are not functions', () => {
    const o = new Observable();
    expect(() => {
      o.validateTypeHandler('perfectType', 'wish this was a function..');
    }).toThrow();
  });
});

describe('validateTypeMessage', () => {
  it('rejects types that are not strings', () => {
    const o = new Observable();
    expect(() => {
      o.validateTypeMessage({ hello: 'darkness my old friend' }, function() {});
    }).toThrow();
  });
  
  it('rejects messages that are not objects', () => {
    const o = new Observable();
    expect(() => {
      o.validateTypeMessage('perfectType', 'wish this was an object..');
    }).toThrow();
  });
});

describe('on', () => {
  it('validates its arguments', () => {
    const o = new Observable();
    expect(() => {
      o.on({ hello: 'darkness my old friend'}, 'not a proper handler type');
    }).toThrow();
  });

  it('creates a new set for types without a set', () => {
    const o = new Observable();
    const type = 'test';
    expect(o.types.has(type)).toBe(false);
    o.on(type, function() {});
    expect(o.types.has(type)).toBe(true);
  });

  it('adds the handler to the set of handlers for its type', () => {
    const o = new Observable();
    const type = 'test';
    const handler = function() {};
    expect(o.types.has(type)).toBe(false);
    o.on(type, handler);
    expect(o.types.has(type)).toBe(true);
    expect(o.types.get(type).has(handler)).toBe(true);
  });
});

describe('off', () => {
  it('validates its arguments', () => {
    const o = new Observable();
    expect(() => {
      o.off({ hello: 'darkness my old friend'}, 'not a proper handler type');
    }).toThrow();
  });

  it('does nothing for types it does not contain', () => {
    const o = new Observable();
    const type = 'test';
    expect(o.types.has(type)).toBe(false);
    o.on(type, function() {});
    expect(o.types.has(type)).toBe(true);
    o.off('hello', function() {});
    expect(o.types.has(type)).toBe(true);
  });

  it('removes the handler from the set of handlers for the type', () => {
    const o = new Observable();
    const type = 'test';
    const handler = function() {};
    expect(o.types.has(type)).toBe(false);
    o.on(type, handler);
    expect(o.types.has(type)).toBe(true);
    expect(o.types.get(type).has(handler)).toBe(true);
    o.off(type, handler);
    expect(o.types.get(type).has(handler)).toBe(false);
  });
});

describe('emit', () => {
  it('validates its arguments', () => {
    const o = new Observable();
    expect(() => {
      o.emit({ hello: 'darkness my old friend'}, 'not a proper message type');
    }).toThrow();
  });

  it('does nothing if it has no handlers for the type', () => {
    const o = new Observable();
    const type = 'test';
    const message = { testing: true };
    const handler = jest.fn();
    o.on('otherType', handler);
    o.emit(type, message);
    expect(handler).not.toHaveBeenCalled();
  });

  it('calls each handler of the given message type', () => {
    const o = new Observable();
    const type = 'test';
    const message = { testing: true };
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    o.on(type, handler1);
    o.on(type, handler2);
    o.emit(type, message);
    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });
});