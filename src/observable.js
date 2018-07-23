export default class Observable {
  constructor() {
    this.types = new Map();
  }

  validateTypeHandler = (type, handler) => {
    if (typeof type !== 'string') {
      throw new Error('Type must be a string');
    }

    if (typeof handler !== 'function') {
      throw new Error('Handler must be a function');
    }
  }

  validateTypeMessage = (type, message) => {
    if (typeof type !== 'string') {
      throw new Error('Type must be a string');
    }

    if (typeof message !== 'object') {
      throw new Error('Message must be an object');
    }
  }

  on = (type, handler) => {
    this.validateTypeHandler(type, handler);

    if (!this.types.has(type)) {
      this.types.set(type, new Set());
    }

    this.types.get(type).add(handler);
  }

  off = (type, handler) => {
    this.validateTypeHandler(type, handler);

    if (!this.types.has(type)) {
      return;
    }

    this.types.get(type).delete(handler);
  }

  emit = (type, message) => {
    this.validateTypeMessage(type, message);

    if (!this.types.has(type)) {
      return;
    }

    const handlers = this.types.get(type);
    handlers.forEach(handler => handler(message));
  }
}
