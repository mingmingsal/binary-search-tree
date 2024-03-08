var nodeh = -1;

function Node(data = null, left = null, right = null) {
    return { data, left, right }
}
function tree(array) {
    let root = buildTree(array, 0, array.length - 1);
    function getRoot(){
        return root;
    }
    function buildTree(array, left, right) {
        if (left > right) return null;

        const mid = Math.floor((left + right) / 2);
        const root = Node(array[mid]);
        root.left = buildTree(array, left, mid - 1);
        root.right = buildTree(array, mid + 1, right);

        return root;

    }
    function insert(value, node = root) {
        if (node === null) {
            return Node(value);
        }
        if (node.data > value) node.left = insert(value, node.left);
        if (node.data < value) node.right = insert(value, node.right);
        return node;
    }
    function find(value, node = root) {
        if (value == node.data) {
            return node;
        }
        if (value > node.data) return find(value, node.right);
        if (value < node.data) return find(value, node.left);
    }
    function deleteItem(value, node = root) {
        if (node == null) return node;
        if (value > node.data) {
            node.right = deleteItem(value, node.right);
            return node;
        }
        else if (value < node.data) {
            node.left = deleteItem(value, node.left);
            return node;
        }

        if (node.left == null) {
            let temp = node.right;
            delete node;
            return temp;
        }
        else if (node.right == null) {
            let temp = node.left;
            delete node;
            return temp;
        }

        else {
            let succParent = node;

            let succ = node.right;
            while (succ.left !== null) {
                succParent = succ;
                succ = succ.left;
            }

            if (succParent !== node) {
                succParent.left = succ.right;
            } else {
                succParent.right = succ.right;
            }

            node.data = succ.data;

            delete succ;
            return node;
        }

    }
    function inOrder(callback, node = root, values = []) {
        if (node) {

            // Traverse left subtree
            inOrder(callback, node.left, values);

            // If callback exists, pass node onto callback
            //Else, append node to value;
            if (typeof callback == "function") {
                callback(node);
            }
            else {
                values.push(node.data);
            }


            // Traverse right subtree
            inOrder(callback, node.right, values);
        }
        return values;
    }
    function preOrder(callback, node = root, values = []) {
        if (node) {
            // If callback exists, pass node onto callback
            //Else, append node to value;
            if (typeof callback == "function") {
                callback(node);
            }
            else {
                values.push(node.data);
            }
            preOrder(callback, node.left, values);
            preOrder(callback, node.right, values);
        }
        return values;
    }
    function postOrder(callback, node = root, values = []) {
        if (node) {
            // If callback exists, pass node onto callback
            //Else, append node to value;
            postOrder(callback, node.left, values);
            postOrder(callback, node.right, values);
            if (typeof callback == "function") {
                callback(node);
            }
            else {
                values.push(node.data);
            }

        }
        return values;
    }
    function levelOrder(callback, queue = [root]) {
        const values = []
        while (queue.length > 0) {
            let node = queue.pop();
            if (node.left != null) queue.unshift(node.left);
            if (node.right != null) queue.unshift(node.right);
            if (typeof callback == "function") {
                callback(node);
            }
            else {
                values.push(node.data);
            }


        }
        return values;

    }
    function depth(value, node = root) {

        if (node == null) return -1;
        let dist = -1;
        if ((value == node.data) || (dist = depth(value, node.left)) >= 0 ||
            (dist = depth(value, node.right)) >= 0) {
            return dist + 1;
        }
        return dist
    }
    function height(value, node = root) {
        if (node == root) nodeh = 0;
        if (node == null) return -1;


        var leftHeight = height(value, node.left);

        var rightHeight = height(value, node.right);

        var ans = Math.max(leftHeight, rightHeight) + 1;

        if (node.data == value)
            nodeh = ans;
        return ans;
    }
    function isBalanced() {
        function helper(node) {
            if (node == null) return [true, 0];
            const left = helper(node.left)
            const right = helper(node.right)
            const balanced = (left[0] && right[0] && Math.abs(left[1] - right[1]) <= 1)
            return [balanced, (1 + Math.max(left[1], right[1]))]
        }
    return helper(root)[0]
    }
    function rebalance() {
        const newArray = inOrder();
        console.log(newArray);
        root = buildTree(newArray, 0, newArray.length - 1);
    }
    return { getRoot, insert, find, deleteItem, inOrder, preOrder, postOrder, levelOrder, height, depth, isBalanced, rebalance }
}
function quickSort(array) {
    if (array < 2) {
        return array;
    }
    else {
        const pivot = array[0];
        const left = [];
        const right = [];
        array.forEach(element => {
            if (element < pivot) {
                left.push(element);
            }
            else if (element > pivot) {
                right.push(element);
            }
        });
        return [].concat(quickSort(left)).concat(pivot).concat(quickSort(right));
    }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
function multiplyby2(value) {
    value.data = value.data * 2;
}
const testar = quickSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const testar2 = quickSort([1, 7, 4, 23]);
const makeTree = tree(testar);
makeTree.insert(123);
makeTree.insert(54);
makeTree.insert(154);
makeTree.insert(254);
makeTree.rebalance();
console.log(makeTree.preOrder());
prettyPrint(makeTree.getRoot());
