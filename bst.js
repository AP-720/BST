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

	deleteItem(value, node = this.root) {
		// Check if the node to be deleted is the root and matches the value to delete.
		if (node === this.root && node.value === value) {
			// Case 1: Root has no children (leaf node)
			if (!node.left && !node.right) {
				// If the root has no left or right child, simply set the root to null.
				this.root = null;
			}
			// Case 2: Root has one child (right child only)
			else if (!node.left) {
				// If the root has only a right child, replace the root with the right child.
				this.root = node.right;
			}
			// Case 3: Root has one child (left child only)
			else if (!node.right) {
				// If the root has only a left child, replace the root with the left child.
				this.root = node.left;
			}
			// Case 4: Root has two children
			else {
				// If the root has both left and right children:
				// Find the in-order successor (smallest value in the right subtree).
				let successor = this.getSuccessor(node.right);

				// Replace the root's value with the in-order successor's value.
				this.root.value = successor.value;

				// Recursively delete the successor from the right subtree.
				this.root.right = this.deleteItem(successor.value, this.root.right);
			}

			// Since the root was processed directly, return here to avoid further traversal.
			return;
		}

		// Base case: If the subtree is empty, return null
		if (!node) {
			return null;
		}

		// Traverse the left subtree if the value is smaller than the current node's value
		if (value < node.value) {
			node.left = this.deleteItem(value, node.left);
		}
		// Traverse the right subtree if the value is larger than the current node's value
		else if (value > node.value) {
			node.right = this.deleteItem(value, node.right);
		}
		// Found the node to delete
		else {
			// Case 1: Node has no children (it's a leaf node)
			if (!node.left && !node.right) {
				return null;
			}

			// Case 2: Node has only a right child
			if (!node.left) {
				return node.right;
			}

			// Case 3: Node has only a left child
			if (!node.right) {
				return node.left;
			}

			// Case 4: Node has two children
			// Find the in-order successor (smallest value in the right subtree)
			let successor = this.getSuccessor(node.right);

			// Replace the current node's value with the successor's value
			node.value = successor.value;

			// Delete the successor from the right subtree
			node.right = this.deleteItem(successor.value, node.right);
		}

		// Return the updated node
		return node;
	}

	// helper method to find the smallest value in the right subtree as that will be the closet number to the deleted nodes value.
	getSuccessor(node) {
		while (node.left) {
			node = node.left;
		}
		return node;
	}

	find(value) {
		// Start traversal from the root node
		let currentNode = this.root;

		// If the tree is empty, return null
		if (!currentNode) {
			return null;
		}

		// Traverse the tree iteratively
		while (currentNode) {
			// Check if the current node holds the target value
			if (value === currentNode.value) {
				return currentNode;
			}

			// Move to the left subtree if the value is smaller
			if (value < currentNode.value) {
				currentNode = currentNode.left;
			}
			// Move to the right subtree if the value is larger
			else if (value > currentNode.value) {
				currentNode = currentNode.right;
			}
		}

		// If the value is not found in the tree, return null
		return null;
	}
}
