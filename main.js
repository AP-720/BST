import { Tree } from "./bst.js";

const testArray = [1, 2, 3, 4, 5, 6, 7];

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}

	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

const test = new Tree(testArray);

// test.insert(10);
// test.insert(20);
// test.insert(5);
// test.insert(8);

prettyPrint(test.root);
