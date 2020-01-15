/*

1. 
2. 
3.
4. Contrast this situation with the recursive tree functions that we have studied
(e.g., size and height) which needed to examine BOTH subtrees to compute their
answers. We found that in these cases, we must do two recursive calls inside
such functions, always recurring both in the left and to the right. For
searching in a BST, we must examine at most one subtree of a node (left OR
right) based on a comparison at the root of a subtree, so we can write a search
function iteratively.

*/

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key, value) {
    // If the tree is empty 
      //this key parameter is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      /* If the tree already exists,  start at the root, 
       and compare it to the key you want to insert.
       If the new key is less than the node's key 
       then the new node needs to live in the left-hand branch */
      /* If the existing node does not have a left child /     the `left` pointer is empty, 
           insert the new node as the left child of that node + pass `this` as the parent */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        /* If the node has an existing left child, 
           recursively call the `insert` method 
           the node is added further down the tree */
        this.left.insert(key, value);
      }
    }
    // Similarly, if the new key is greater than the node's key
    //then you do the same thing, on the right-hand side */
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
        return this.value;
    }
    /* If the item you are looking for is less than the root follow the left child.
       If there is an existing left child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key < this.key && this.left) {
        return this.left.find(key);
    }
    /* If the item you are looking for is greater than the root 
      follow the right child.
       If there is an existing right child, 
        recursively check its left and/or right child
        until you find the item */
    else if (key > this.key && this.right) {
        return this.right.find(key);
    }
    // after search, item is not in the tree
    else {
        throw new Error('Key Error');
    }
}

remove(key) {
  if (this.key == key) {
      if (this.left && this.right) {
          const successor = this.right._findMin();
          this.key = successor.key;
          this.value = successor.value;
          successor.remove(successor.key);
      }
      /* If the node only has a left child, 
         treplace the node with its left child */
      else if (this.left) {
          this._replaceWith(this.left);
      }
      /* if the node only has a right child 
         replace it with its right child */
      else if (this.right) {
          this._replaceWith(this.right);
      }
      /* If the node has no children 
         remove it and any references to it 
         by calling "this._replaceWith(null)" */
      else {
          this._replaceWith(null);
      }
  }
  else if (key < this.key && this.left) {
      this.left.remove(key);
  }
  else if (key > this.key && this.right) {
      this.right.remove(key);
  }
  else {
      throw new Error('Key Error');
  }
}
_replaceWith(node) {
  if (this.parent) {
      if (this == this.parent.left) {
          this.parent.left = node;
      }
      else if (this == this.parent.right) {
          this.parent.right = node;
      }

      if (node) {
          node.parent = this.parent;
      }
  }
  else {
      if (node) {
          this.key = node.key;
          this.value = node.value;
          this.left = node.left;
          this.right = node.right;
      }
      else {
          this.key = null;
          this.value = null;
          this.left = null;
          this.right = null;
      }
  }
}

_findMin() {
  if (!this.left) {
      return this;
  }
  return this.left._findMin();
}
}

let BST = new BinarySearchTree(6)

console.log('init', BST )


//find the height of BST
//WATCH: https://www.youtube.com/watch?time_continue=119&v=TQI_m32_AeU&feature=emb_title 

function findTreeHeight(node){
  if (!node){
    return 0
  }
  return findTreeHeight(node.left) + node.value + findTreeHeight(node.right)
}

console.log('TREE HEIGHT: ', findTreeHeight(BST));

function height(node, counter = 0) {
  if (!node) {
    return 0;
  }
  counter++;
  let left = counter;
  let right = counter;
  if (node.left) left = height(node.left, counter);
  if (node.right) right = height(node.right, counter);

  return left > right ? left : right;
}

function areYouBST(node) {
  if (!node) {
    return null;
  }
  //traverse tree left to right- if value is lower on left and on right is higher true, else false;
  let leftCont;
  let rightCont;
  if (node.left < node) {
    left = areYouBST(node.left);
  } else {
    return false;
  }

  if (node.right > node) {
    right = areYouBST(node.right);
  } else {
    return false;
  }
  return !leftCont || !rightCont ? false : true;
}
console.log('are you bst?', areYouBST(BST));
