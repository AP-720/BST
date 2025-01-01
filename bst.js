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
		// console.log(array[midPoint]);

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

	insert(value) {
		// Step 1: If the tree is empty, create the root node
		if (!this.root) {
			// If there's no root, the tree is empty, so we set the root to a new node with the given value
			this.root = new Node(value);
			return;
		}

		// Step 2: Start traversing the tree from the root
		let current = this.root;

		// Step 3: Traverse the tree to find the correct spot for the new value
		while (current) {
			// Step 3a: Check if the value already exists in the tree
			if (current.value === value) {
				return;
			}

			// Step 3b: If the new value is smaller than the current node's value, go left
			if (value < current.value) {
				// If the left child does not exist, create a new node there
				if (!current.left) {
					current.left = new Node(value);
					return;
				}
				current = current.left;
			}
			// Step 3c: If the new value is greater than the current node's value, go right
			else if (value > current.value) {
				// If the right child does not exist, create a new node there
				if (!current.right) {
					current.right = new Node(value);
					return;
				}
				current = current.right;
			}
		}
	}
}
