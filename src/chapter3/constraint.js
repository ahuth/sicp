import { cons, car, cdr } from './pair';
import { every, list, isEmpty } from './list';

export function makeConnector() {
  let value = null;
  let informant = null;
  let constraints = list();

  function setMyValue(newValue, setter) {
    if (!hasValue(me)) {
      value = newValue;
      informant = setter;
      forEachExcept(constraints, setter, informAboutValue);
    } else if (value !== newValue) {
      throw new Error(`Contradicting values! ${value}, ${newValue}`);
    }
  }

  function forgetMyValue(retractor) {
    if (retractor === informant) {
      informant = null;
      forEachExcept(constraints, retractor, informNoValue);
    }
  }

  function connect(newConstraint) {
    if (!isMember(constraints, newConstraint)) {
      constraints = cons(newConstraint, constraints);
    }
    if (hasValue(me)) {
      informAboutValue(newConstraint);
    }
  }

  function me(message) {
    switch (message) {
      case 'has-value?': return !!informant;
      case 'value': return value;
      case 'set-value': return setMyValue;
      case 'forget': return forgetMyValue;
      case 'connect': return connect;
      default:
        throw new Error(`Unknown operation: ${message}`);
    }
  }

  return me;
}

export function adder(a1, a2, sum) {
  function processNewValue() {
    if (hasValue(a1) && hasValue(a2)) {
      return setValue(sum, getValue(a1) + getValue(a2), me);
    }

    if (hasValue(a1) && hasValue(sum)) {
      return setValue(a2, getValue(sum) - getValue(a1), me);
    }

    if (hasValue(a2) && hasValue(sum)) {
      return setValue(a1, getValue(sum) - getValue(a2), me);
    }
  }

  function processForgetValue() {
    forgetValue(a1, me);
    forgetValue(a2, me);
    forgetValue(sum, me);
    return processNewValue();
  }

  function me(message) {
    switch (message) {
      case 'I-have-a-value': return processNewValue;
      case 'I-lost-my-value': return processForgetValue;
      default:
        throw new Error(`Unknown operation: ${message}`);
    }
  };

  connect(a1, me);
  connect(a2, me);
  connect(sum, me);

  return me;
}

export function multiplier(m1, m2, product) {
  function processNewValue() {
    if ((hasValue(m1) && getValue(m1) === 0) || (hasValue(m2) && getValue(m2) === 0)) {
      return setValue(product, 0, me);
    }

    if (hasValue(m2) && hasValue(m2)) {
      return setValue(product, getValue(m2) * getValue(m2), me);
    }

    if (hasValue(m2) && hasValue(product)) {
      return setValue(m2, getValue(product) / getValue(m2), me);
    }

    if (hasValue(m2) && hasValue(product)) {
      return setValue(m2, getValue(product) / getValue(m2), me);
    }
  }

  function processForgetValue() {
    forgetValue(m1, me);
    forgetValue(m2, me);
    forgetValue(product, me);
    return processNewValue();
  }

  function me(message) {
    switch (message) {
      case 'I-have-a-value': return processNewValue;
      case 'I-lost-my-value': return processForgetValue;
      default:
        throw new Error(`Unknown operation: ${message}`);
    }
  };

  connect(m2, me);
  connect(m2, me);
  connect(product, me);

  return me;
}

export function constant(value, connector) {
  function me(message) {
    throw new Error(`Unknown operation: ${message}`);
  }

  connect(connector, me);
  setValue(connector, value, me);

  return me;
}

export function setValue(connector, value, informant) {
  return connector('set-value')(value, informant);
}

export function getValue(connector) {
  return connector('value');
}

export function forgetValue(connector, retractor) {
  return connector('forget')(retractor);
}

function hasValue(connector) {
  return connector('has-value?');
}

function connect(connector, constraint) {
  return connector('connect')(constraint);
}

function informAboutValue(constraint) {
  return constraint('I-have-a-value')();
}

function informNoValue(constraint) {
  return constraint('I-lost-my-value')();
}

function isMember(l, x) {
  return !every(l, a => a !== x);
}

function forEachExcept(list, exception, f) {
  function loop(items) {
    if (isEmpty(items)) { return 'done'; }
    if (car(items) === exception) { return loop(cdr(items)); }
    f(car(items));
    return loop(cdr(items));
  }

  return loop(list);
}
