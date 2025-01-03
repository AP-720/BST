import { Tree } from "./bst.js";

// Remember that to immediately assign the result of a function to a variable you need to use IIFE.
// const testArray = (function randomNumberArray() {
// 	const array = [];
// 	for (let i = 0; i < 10; i++) {
// 		const randomNumber = Math.floor(Math.random() * 100) + 1;
// 		array.push(randomNumber);
// 	}
// 	return array;
// })();

// Nice way to test and log the find method.
// const testFind = (tree, value) => {
//     const result = tree.find(value);
//     if (result) {
//         console.log(`Found value ${value}:`, result);
//     } else {
//         console.log(`Value ${value} not found.`);
//     }
// };

// [1, 2, 3, 4, 5, 6, 7]

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

prettyPrint(test.root);
