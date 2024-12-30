class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

export class Tree {
	constructor(array) {
		this.root = this.buildTree(array, 0, array.length - 1);
		this.array = array;
	}

	buildTree(array, start, end) {
		// Base case: If the subarray is empty, return null
		if (start > end) {
			return null;
		}

		// Find the midpoint index within the current subarray
		let midPoint = Math.floor((start + end) / 2);

		// Create a root node with the value at the midpoint
		let rootNode = new Node(array[midPoint]);

		// Recursively build the left and right subtrees
		rootNode.left = this.buildTree(array, start, midPoint - 1); // Left subtree (before midpoint)
		rootNode.right = this.buildTree(array, midPoint + 1, end); // Right subtree (after midpoint)

		// Step 4: Return the root node
		return rootNode;
	}
}
