import { car, cadr, caddr } from './pair';
import { list, isEmpty, EMPTY_LIST } from './list';

export function isElementOfSet(set, x) {
  if (isEmpty(set)) { return false; }
  if (x === entry(set)) { return true; }
  if (x < entry(set)) { return isElementOfSet(leftBranch(set), x); }
  return isElementOfSet(rightBranch(set), x);
}

export function adjoinSet(set, x) {
  if (isEmpty(set)) { return makeTree(x, EMPTY_LIST, EMPTY_LIST); }
  if (x === entry(set)) { return set; }

  if (x < entry(set)) {
    return makeTree(
      entry(set),
      adjoinSet(leftBranch(set), x),
      rightBranch(set),
    );
  }

  return makeTree(
    entry(set),
    leftBranch(set),
    adjoinSet(rightBranch(set), x),
  );
}

// export function intersectionSet(a, b) {
//   if (isEmpty(a) || isEmpty(b)) { return EMPTY_LIST; }

//   const headA = car(a);
//   const headB = car(b);

//   if (headA === headB) {
//     return cons(
//       headA,
//       intersectionSet(cdr(a), cdr(b)),
//     );
//   }

//   if (headA < headB) {
//     return intersectionSet(cdr(a), b);
//   }

//   return intersectionSet(a, cdr(b));
// }

// export function unionSet(a, b) {
//   if (isEmpty(a)) { return b; }
//   if (isEmpty(b)) { return a; }

//   const headA = car(a);
//   const headB = car(b);

//   if (headA === headB) {
//     return cons(
//       headA,
//       unionSet(cdr(a), cdr(b)),
//     );
//   }

//   if (headA < headB) {
//     return cons(
//       headA,
//       unionSet(cdr(a), b),
//     );
//   }

//   return cons(
//     headB,
//     unionSet(a, cdr(b)),
//   );
// }

const entry = car;
const leftBranch = cadr;
const rightBranch = caddr;

export function makeTree(entry, left, right) {
  return list(entry, left || EMPTY_LIST, right || EMPTY_LIST);
}
