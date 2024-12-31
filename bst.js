class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

export class Tree {
	constructor(array) {
		const sortedUniqueArray = this.sortArray(array);
		this.root = this.buildTree(
			sortedUniqueArray,
			0,
			sortedUniqueArray.length - 1
		);
		this.array = array;
	}

	buildTree(array, start, end) {
		// Base case: If the subarray is empty, return null
		if (start > end) {
			return null;
		}

		// Find the midpoint index within the current subarray
		let midPoint = Math.floor((start + end) / 2);
		console.log(array[midPoint]);

		// Create a root node with the value at the midpoint
		let rootNode = new Node(array[midPoint]);

		// Recursively build the left and right subtrees
		rootNode.left = this.buildTree(array, start, midPoint - 1); // Left subtree (before midpoint)
		rootNode.right = this.buildTree(array, midPoint + 1, end); // Right subtree (after midpoint)

		// Step 4: Return the root node
		return rootNode;
	}

	sortArray(array) {
		const processedArray = [...new Set(array)].sort((a, b) => a - b);
		return processedArray;
	}
}
